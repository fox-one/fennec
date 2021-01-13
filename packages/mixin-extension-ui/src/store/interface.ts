import { AppModuleTypes } from "./modules/app/interfaces";

export type RootState = {};

type StoreModules = {
  app: AppModuleTypes;
};

export type Store = AppModuleTypes<Pick<StoreModules, "app">>;
