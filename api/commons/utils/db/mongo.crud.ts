import { Model, Schema } from "mongoose";
class CrudOperations {
  private dbModel: Model<any>;

  constructor(dbModel: Model<any>) {
    this.dbModel = dbModel;
  }

  save(obj: Record<string, any>): any {
    const model = new this.dbModel(obj);
    return model.save(obj);
  }

  insertOrUpdate(query: any, document: Record<string, any>): any {
    return this.dbModel.findOneAndUpdate(
      query,
      document,
      { upsert: true, new: true }
    );
  }

  insertManyDocuments(
    docs: any[],
    options: { ordered: boolean; rawResult: boolean }
  ): Promise<any> {
    return this.dbModel.insertMany(docs, options);
  }

  updateManyDocuments(
    query: any,
    docs: any[],
    options: any,
  ): any {
    return this.dbModel.updateMany(query, docs, options);
  }

  /**
   * @method - Get one document
   * @param query - Query for the mongo documents.
   * @param projections - Feilds to be included in the result.
   */
  getDocument(query: any, projections: any): any {
    return this.dbModel.findOne(query, projections);
  }

  getDocumentById(id: any, projections: any): any {
    return this.dbModel.findById(id, projections);
  }

  /**
   * @method: Gets all the documents in a paginated way.
   * @param query: The regualr mongo query
   * @param options: limit and pageno to set the offset and limit on the result count.
   */
  getAllDocuments(
    query: any,
    projections: any,
    options: { pageNo: number; limit: number },
    sort?: any
  ): any {
    const offset = options.limit * options.pageNo;
    return this.dbModel
      .find(query, projections)
      .skip(offset)
      .limit(options.limit)
      .sort(sort ? sort : { createdAt: -1 })
      .lean();
  }

  countAllDocuments(query: any): any {
    //count method deprecated, will be removed in later versions
    return this.dbModel.countDocuments(query).lean();
  }

  /**
   * Only to be used for the seeding the admins into the system.
   * @param doc
   *
   */
  createAndUpdateDocumentByEmail(doc: any): any {
    return this.dbModel.findOneAndUpdate({ email: doc.email }, doc, {
      new: true,
      upsert: true,
    });
  }

  upsertWithUpdateQuery(query: any, updateQuery: any): any {
    return this.dbModel.findOneAndUpdate(query, updateQuery, {
      upsert: true,
      new: true,
    });
  }

  upsertWithReturnDocuments(query: any, updateObj: any): any {
    return this.dbModel.findOneAndUpdate(
      query,
      { $set: updateObj },
      { upsert: true, new: true }
    );
  }

  updateDocument(query: any, doc: any): any {
    return this.dbModel
      .findOneAndUpdate(query, { $set: doc }, { new: true })
      .lean();
  }

  updateOneDocument(query: any, doc: any): any {
    return this.dbModel
      .findOneAndUpdate(query, doc, { new: true })
      .lean();
  }

  updateAllDocuments(query: any, doc: any): any {
    return this.dbModel.updateMany(query, { $set: doc }, { new: true });
  }

  updateSubDocument(query: any, doc: any, options: any): any {
    return this.dbModel.update(query, { $push: doc }, options);
  }

  deleteDocument(query: any): any {
    return this.dbModel.deleteOne(query);
  }

  deleteAllDocuments(query: any): any {
    return this.dbModel.deleteMany(query);
  }

  getSchema(): Schema {
    return this.dbModel.schema;
  }
}

export default CrudOperations;
