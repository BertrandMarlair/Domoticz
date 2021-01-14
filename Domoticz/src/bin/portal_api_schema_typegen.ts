/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */


import { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    email<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "Email";
    timestamp<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "Timestamp";
    json<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "Json";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    email<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Email";
    timestamp<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Timestamp";
    json<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Json";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  editProviderInput: { // input type
    _id: string; // ID!
    description: string; // String!
    icon: string; // String!
    slug: string; // String!
    title: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  Application: { // root type
    _id: string; // ID!
    description: string; // String!
    title: string; // String!
  }
  Block: { // root type
    _id: string; // ID!
    description: string; // String!
    title: string; // String!
  }
  Delete: { // root type
    id: number; // Int!
  }
  Mutation: {};
  Provider: { // root type
    _id: string; // ID!
    description: string; // String!
    icon: string; // String!
    slug: string; // String!
    title: string; // String!
  }
  Query: {};
  Status: { // root type
    color: string; // String!
    title: string; // String!
  }
  Test: { // root type
    _id: string; // ID!
    description: string; // String!
    title: string; // String!
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  Email: any;
  Json: any;
  Timestamp: any;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
<<<<<<< HEAD
  createBlockInput: NexusGenInputs['createBlockInput'];
  editBlockInput: NexusGenInputs['editBlockInput'];
=======
  editProviderInput: NexusGenInputs['editProviderInput'];
>>>>>>> develop
}

export interface NexusGenFieldTypes {
  Application: { // field return type
    _id: string; // ID!
    description: string; // String!
    title: string; // String!
  }
  Block: { // field return type
    _id: string; // ID!
    description: string; // String!
    title: string; // String!
  }
  Delete: { // field return type
    id: number; // Int!
  }
  Mutation: { // field return type
    createBlock: NexusGenRootTypes['Block']; // Block!
    editApplication: NexusGenRootTypes['Application']; // Application!
<<<<<<< HEAD
    editBlock: NexusGenRootTypes['Block']; // Block!
    editTest: NexusGenRootTypes['Test']; // Test!
  }
  Query: { // field return type
    getAllApplications: NexusGenRootTypes['Application'][] | null; // [Application!]
    getAllBlocks: NexusGenRootTypes['Block'][] | null; // [Block!]
=======
    editProvider: NexusGenRootTypes['Provider']; // Provider!
    editTest: NexusGenRootTypes['Test']; // Test!
  }
  Provider: { // field return type
    _id: string; // ID!
    description: string; // String!
    icon: string; // String!
    slug: string; // String!
    title: string; // String!
  }
  Query: { // field return type
    getAllApplications: NexusGenRootTypes['Application'][] | null; // [Application!]
    getAllProviders: NexusGenRootTypes['Provider'][] | null; // [Provider!]
>>>>>>> develop
    getAllTests: NexusGenRootTypes['Test'][] | null; // [Test!]
  }
  Status: { // field return type
    code: string; // String!
    color: string; // String!
    title: string; // String!
  }
  Test: { // field return type
    _id: string; // ID!
    description: string; // String!
    title: string; // String!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
<<<<<<< HEAD
    createBlock: { // args
      block: NexusGenInputs['createBlockInput']; // createBlockInput!
    }
    editBlock: { // args
      block: NexusGenInputs['editBlockInput']; // editBlockInput!
=======
    editProvider: { // args
      provider: NexusGenInputs['editProviderInput']; // editProviderInput!
>>>>>>> develop
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

<<<<<<< HEAD
export type NexusGenObjectNames = "Application" | "Block" | "Delete" | "Mutation" | "Query" | "Status" | "Test";

export type NexusGenInputNames = "createBlockInput" | "editBlockInput";
=======
export type NexusGenObjectNames = "Application" | "Delete" | "Mutation" | "Provider" | "Query" | "Status" | "Test";

export type NexusGenInputNames = "editProviderInput";
>>>>>>> develop

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Email" | "Float" | "ID" | "Int" | "Json" | "String" | "Timestamp";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}