import QueryBuilder from "../../builder/queryBuilder";
import { serviceSearchableFields } from "./service.constant";

import { TService } from "./service.interface";
import { Service } from "./service.model";

const createServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload);
  return result;
};

const getAllServiceFromDB = async (query: Record<string, unknown>) => {
  const serviceQuery = new QueryBuilder(Service.find(), query)
    .search(serviceSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await serviceQuery.countTotal();
  const result = await serviceQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleServiceFromDB = async (id: string) => {
  const result = await Service.findById(id);
  return result;
};

const updateServiceFromDB = async (id: string, payload: Partial<TService>) => {
  const result = await Service.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteServiceFromDB = async (id: string) => {
  const result = await Service.findByIdAndUpdate(id);
  return result;
};

export const ServiceServices = {
  createServiceIntoDB,
  getAllServiceFromDB,
  getSingleServiceFromDB,
  updateServiceFromDB,
  deleteServiceFromDB,
};
