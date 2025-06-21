import Anthropic from '@anthropic-ai/sdk';
import { CrudOperations } from './db';
import { ListingTrivia } from '../models';
import config from '../../src/appConfig'
const anthropic = new Anthropic({apiKey: config.CLAUDE_KEY});


export class LLM {
    private image_media_type: any;
    private image_url: any;

    constructor(image_media_type: any, image_url: any) {
        this.image_media_type = image_media_type;
        this.image_url = image_url;
    }

    public async loadLLMData(listingId:any){
        try{
            let leaseSummarizeObj = await this.leaseSummariser()
            // console.log("C::::", leaseSummarizeObj[0])
            let keys = Object.keys(leaseSummarizeObj)
            console.log("Key::", keys)
            let touristPlaces = await this.touristPlaces(leaseSummarizeObj[keys[0]])
            let restaurants = await this.restaurants(leaseSummarizeObj[keys[0]])
            let grocery = await this.groceryStores(leaseSummarizeObj[keys[0]])
            let obj = {
                property_addr: leaseSummarizeObj[keys[0]],
                owner: leaseSummarizeObj[keys[1]],
                tenants: leaseSummarizeObj[keys[2]],
                tourist_places: touristPlaces,
                restaurant_places: restaurants,
                grocery: grocery,
                listing_id: listingId
            }
            await new CrudOperations(ListingTrivia).save(obj)
            console.log("Done")
        } catch (error) {
            console.log("LLM error: " + error);
        }
    }

    public async leaseSummariser() {
        const buffer =await ((await fetch(this.image_url)).arrayBuffer());
        const image_data = Buffer.from(buffer).toString('base64')    
        
        const message = await anthropic.messages.create({
            model: 'claude-3-opus-20240229',
            max_tokens: 1024,
            messages: [
                  {
                      "role": "user",
                      "content": [
                          {
                              "type": "image",
                              "source": {
                                  "type": "base64",
                                  "media_type": this.image_media_type,
                                  "data": image_data,
                              },
                          }
                      ],
                  },
                  {"role": "assistant", "content": "Sure!"},
                //   {"role": "user", "content": "What is the property address and owner name and tenant names?Don't give me description, give me key, value"}
                  {"role": "user", "content": "What is the property address and owner name and tenant names? Do not give me title/description or any other text. Please give me only key, value pairs."}
                ]
        });
    
        let info = message.content[0].text
        console.log("Message::", message.content[0].text)
        let lines = info.split("\n")
        
        let obj:any = {};
        for(let line of lines) {
            let field = line.trim().split(":")
            obj[field[0]] = field[1]
        }
        return obj;
    }

    public async touristPlaces(address:any) {
        const message = await anthropic.messages.create({
          max_tokens: 1024,
          messages:[{ role: 'user', content: `Here is the ${address}. Extract city(but dont print city in your response) and give me top 5 tourist places nearby. Only print names of tourist places, do not give any other descriptions/title or any other text.`}],
          model: 'claude-3-opus-20240229',
        });
      
        // console.log(message.content)
        let claudeText = message.content[0].text
        let touristPlacesArr = claudeText.split("\n")
      
        console.log(touristPlacesArr);
        return touristPlacesArr
    }

    public async restaurants(address:any) {
        const message = await anthropic.messages.create({
          max_tokens: 1024,
          messages: [{ role: 'user', content: `Here is the ${address}. Extract city(but dont print city in your response) and give me top 5 restaurants nearby. Only print names of restaurants, do not give any other descriptions/title or any other text.` }],
          model: 'claude-3-opus-20240229',
        });
      
        let claudeText = message.content[0].text
        let restaurantsArr = claudeText.split("\n")
        console.log("XX::", restaurantsArr)
       
        return restaurantsArr;
    }

    public async groceryStores(address:any) {
        const message = await anthropic.messages.create({
          max_tokens: 1024,
          messages:[{ role: 'user', content: `Here is the ${address}. Extract zip code(but do not print zip code in your response) and give me top 5 grocery stores nearby. ONLY print names of grocery stores, do not give any other descriptions/titles or any other text.`}],
          model: 'claude-3-opus-20240229',
        });
      
        console.log(message.content)
        let claudeText = message.content[0].text
        let finalArr = []
        let groceryStoresArr = claudeText.split("\n")
        
        console.log(groceryStoresArr);
        return groceryStoresArr;
    }
}
