import Logger from "./../utils/Logger.js";

async function findOne(model, query) {
  try {
    const document = await model.findOne(query);
    return document;
  } catch (error) {
    Logger.log("Error", error, import.meta.url);
    throw error;
  }
}

async function insertOne(model, data) {
  try {
    const result = await model.create(data);
    return result;
  } catch (error) {
    Logger.log("Error", error, import.meta.url);
    throw error;
  }
}

function insertMany(model, data) {
  const options = {
    ordered: false,
    rawResult: false,
    lean: true,
    limit: 5,
  };
  return new Promise((resolve, reject) => {
    model.insertMany(data, options, (error, docs) => {
      if (error) {
        reject(error);
      } else {
        resolve(docs);
      }
    });
  });
}

async function findAndUpdate(model, filter, data) {
  try {
    const document = await model.findOneAndUpdate(filter, data, { new: true });
    return document;
  } catch (error) {
    Logger.log("Error", error, import.meta.url);
    throw error;
  }
}

async function findAll(model, query) {
  try {
    const result = await model.find(query);
    return result;
  } catch (error) {
    Logger.log("I am Here Error", error, import.meta.url);
    throw error;
  }
}

async function findAllWithFilter(model, filter) {
  try {
    const result = await model.find({ $or: [...filter] });
    return result;
  } catch (error) {
    Logger.log("Error", error, import.meta.url);
    throw error;
  }
}

export { findOne, insertOne, findAndUpdate, findAll, findAllWithFilter, insertMany };
