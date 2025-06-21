import mongoose from "mongoose";

export default class MongoDBConnection {
    private mongoUrl: string;

    constructor(mongoUrl: string) {
        this.mongoUrl = mongoUrl;
        this.connectToMongoDB();
    }

    public async connectToMongoDB() {
        try {
            await mongoose.connect(this.mongoUrl,
                { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
            );
            console.info("\n*************MONGODB connected**************\n");
        } catch(err: any) {
            console.error("ERROR Connecting the database", err);
        }
    }
}