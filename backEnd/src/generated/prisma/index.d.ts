
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Producer
 * 
 */
export type Producer = $Result.DefaultSelection<Prisma.$ProducerPayload>
/**
 * Model Beehive
 * 
 */
export type Beehive = $Result.DefaultSelection<Prisma.$BeehivePayload>
/**
 * Model Activity
 * 
 */
export type Activity = $Result.DefaultSelection<Prisma.$ActivityPayload>
/**
 * Model ProductionHoney
 * 
 */
export type ProductionHoney = $Result.DefaultSelection<Prisma.$ProductionHoneyPayload>
/**
 * Model TemperaturesHumidity
 * 
 */
export type TemperaturesHumidity = $Result.DefaultSelection<Prisma.$TemperaturesHumidityPayload>
/**
 * Model Food
 * 
 */
export type Food = $Result.DefaultSelection<Prisma.$FoodPayload>
/**
 * Model Disease
 * 
 */
export type Disease = $Result.DefaultSelection<Prisma.$DiseasePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Producers
 * const producers = await prisma.producer.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Producers
   * const producers = await prisma.producer.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.producer`: Exposes CRUD operations for the **Producer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Producers
    * const producers = await prisma.producer.findMany()
    * ```
    */
  get producer(): Prisma.ProducerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.beehive`: Exposes CRUD operations for the **Beehive** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Beehives
    * const beehives = await prisma.beehive.findMany()
    * ```
    */
  get beehive(): Prisma.BeehiveDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productionHoney`: Exposes CRUD operations for the **ProductionHoney** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductionHoneys
    * const productionHoneys = await prisma.productionHoney.findMany()
    * ```
    */
  get productionHoney(): Prisma.ProductionHoneyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.temperaturesHumidity`: Exposes CRUD operations for the **TemperaturesHumidity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TemperaturesHumidities
    * const temperaturesHumidities = await prisma.temperaturesHumidity.findMany()
    * ```
    */
  get temperaturesHumidity(): Prisma.TemperaturesHumidityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.food`: Exposes CRUD operations for the **Food** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Foods
    * const foods = await prisma.food.findMany()
    * ```
    */
  get food(): Prisma.FoodDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.disease`: Exposes CRUD operations for the **Disease** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Diseases
    * const diseases = await prisma.disease.findMany()
    * ```
    */
  get disease(): Prisma.DiseaseDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Producer: 'Producer',
    Beehive: 'Beehive',
    Activity: 'Activity',
    ProductionHoney: 'ProductionHoney',
    TemperaturesHumidity: 'TemperaturesHumidity',
    Food: 'Food',
    Disease: 'Disease'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "producer" | "beehive" | "activity" | "productionHoney" | "temperaturesHumidity" | "food" | "disease"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Producer: {
        payload: Prisma.$ProducerPayload<ExtArgs>
        fields: Prisma.ProducerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProducerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProducerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>
          }
          findFirst: {
            args: Prisma.ProducerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProducerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>
          }
          findMany: {
            args: Prisma.ProducerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>[]
          }
          create: {
            args: Prisma.ProducerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>
          }
          createMany: {
            args: Prisma.ProducerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProducerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>[]
          }
          delete: {
            args: Prisma.ProducerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>
          }
          update: {
            args: Prisma.ProducerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>
          }
          deleteMany: {
            args: Prisma.ProducerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProducerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProducerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>[]
          }
          upsert: {
            args: Prisma.ProducerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProducerPayload>
          }
          aggregate: {
            args: Prisma.ProducerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProducer>
          }
          groupBy: {
            args: Prisma.ProducerGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProducerGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProducerCountArgs<ExtArgs>
            result: $Utils.Optional<ProducerCountAggregateOutputType> | number
          }
        }
      }
      Beehive: {
        payload: Prisma.$BeehivePayload<ExtArgs>
        fields: Prisma.BeehiveFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BeehiveFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeehivePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BeehiveFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeehivePayload>
          }
          findFirst: {
            args: Prisma.BeehiveFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeehivePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BeehiveFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeehivePayload>
          }
          findMany: {
            args: Prisma.BeehiveFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeehivePayload>[]
          }
          create: {
            args: Prisma.BeehiveCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeehivePayload>
          }
          createMany: {
            args: Prisma.BeehiveCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BeehiveCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeehivePayload>[]
          }
          delete: {
            args: Prisma.BeehiveDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeehivePayload>
          }
          update: {
            args: Prisma.BeehiveUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeehivePayload>
          }
          deleteMany: {
            args: Prisma.BeehiveDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BeehiveUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BeehiveUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeehivePayload>[]
          }
          upsert: {
            args: Prisma.BeehiveUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeehivePayload>
          }
          aggregate: {
            args: Prisma.BeehiveAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBeehive>
          }
          groupBy: {
            args: Prisma.BeehiveGroupByArgs<ExtArgs>
            result: $Utils.Optional<BeehiveGroupByOutputType>[]
          }
          count: {
            args: Prisma.BeehiveCountArgs<ExtArgs>
            result: $Utils.Optional<BeehiveCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: Prisma.$ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
      ProductionHoney: {
        payload: Prisma.$ProductionHoneyPayload<ExtArgs>
        fields: Prisma.ProductionHoneyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductionHoneyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionHoneyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductionHoneyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionHoneyPayload>
          }
          findFirst: {
            args: Prisma.ProductionHoneyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionHoneyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductionHoneyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionHoneyPayload>
          }
          findMany: {
            args: Prisma.ProductionHoneyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionHoneyPayload>[]
          }
          create: {
            args: Prisma.ProductionHoneyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionHoneyPayload>
          }
          createMany: {
            args: Prisma.ProductionHoneyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductionHoneyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionHoneyPayload>[]
          }
          delete: {
            args: Prisma.ProductionHoneyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionHoneyPayload>
          }
          update: {
            args: Prisma.ProductionHoneyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionHoneyPayload>
          }
          deleteMany: {
            args: Prisma.ProductionHoneyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductionHoneyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductionHoneyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionHoneyPayload>[]
          }
          upsert: {
            args: Prisma.ProductionHoneyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductionHoneyPayload>
          }
          aggregate: {
            args: Prisma.ProductionHoneyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductionHoney>
          }
          groupBy: {
            args: Prisma.ProductionHoneyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductionHoneyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductionHoneyCountArgs<ExtArgs>
            result: $Utils.Optional<ProductionHoneyCountAggregateOutputType> | number
          }
        }
      }
      TemperaturesHumidity: {
        payload: Prisma.$TemperaturesHumidityPayload<ExtArgs>
        fields: Prisma.TemperaturesHumidityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TemperaturesHumidityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemperaturesHumidityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TemperaturesHumidityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemperaturesHumidityPayload>
          }
          findFirst: {
            args: Prisma.TemperaturesHumidityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemperaturesHumidityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TemperaturesHumidityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemperaturesHumidityPayload>
          }
          findMany: {
            args: Prisma.TemperaturesHumidityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemperaturesHumidityPayload>[]
          }
          create: {
            args: Prisma.TemperaturesHumidityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemperaturesHumidityPayload>
          }
          createMany: {
            args: Prisma.TemperaturesHumidityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TemperaturesHumidityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemperaturesHumidityPayload>[]
          }
          delete: {
            args: Prisma.TemperaturesHumidityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemperaturesHumidityPayload>
          }
          update: {
            args: Prisma.TemperaturesHumidityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemperaturesHumidityPayload>
          }
          deleteMany: {
            args: Prisma.TemperaturesHumidityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TemperaturesHumidityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TemperaturesHumidityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemperaturesHumidityPayload>[]
          }
          upsert: {
            args: Prisma.TemperaturesHumidityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemperaturesHumidityPayload>
          }
          aggregate: {
            args: Prisma.TemperaturesHumidityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemperaturesHumidity>
          }
          groupBy: {
            args: Prisma.TemperaturesHumidityGroupByArgs<ExtArgs>
            result: $Utils.Optional<TemperaturesHumidityGroupByOutputType>[]
          }
          count: {
            args: Prisma.TemperaturesHumidityCountArgs<ExtArgs>
            result: $Utils.Optional<TemperaturesHumidityCountAggregateOutputType> | number
          }
        }
      }
      Food: {
        payload: Prisma.$FoodPayload<ExtArgs>
        fields: Prisma.FoodFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FoodFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FoodFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          findFirst: {
            args: Prisma.FoodFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FoodFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          findMany: {
            args: Prisma.FoodFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>[]
          }
          create: {
            args: Prisma.FoodCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          createMany: {
            args: Prisma.FoodCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FoodCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>[]
          }
          delete: {
            args: Prisma.FoodDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          update: {
            args: Prisma.FoodUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          deleteMany: {
            args: Prisma.FoodDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FoodUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FoodUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>[]
          }
          upsert: {
            args: Prisma.FoodUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodPayload>
          }
          aggregate: {
            args: Prisma.FoodAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFood>
          }
          groupBy: {
            args: Prisma.FoodGroupByArgs<ExtArgs>
            result: $Utils.Optional<FoodGroupByOutputType>[]
          }
          count: {
            args: Prisma.FoodCountArgs<ExtArgs>
            result: $Utils.Optional<FoodCountAggregateOutputType> | number
          }
        }
      }
      Disease: {
        payload: Prisma.$DiseasePayload<ExtArgs>
        fields: Prisma.DiseaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DiseaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DiseaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>
          }
          findFirst: {
            args: Prisma.DiseaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DiseaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>
          }
          findMany: {
            args: Prisma.DiseaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>[]
          }
          create: {
            args: Prisma.DiseaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>
          }
          createMany: {
            args: Prisma.DiseaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DiseaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>[]
          }
          delete: {
            args: Prisma.DiseaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>
          }
          update: {
            args: Prisma.DiseaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>
          }
          deleteMany: {
            args: Prisma.DiseaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DiseaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DiseaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>[]
          }
          upsert: {
            args: Prisma.DiseaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiseasePayload>
          }
          aggregate: {
            args: Prisma.DiseaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDisease>
          }
          groupBy: {
            args: Prisma.DiseaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<DiseaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.DiseaseCountArgs<ExtArgs>
            result: $Utils.Optional<DiseaseCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    producer?: ProducerOmit
    beehive?: BeehiveOmit
    activity?: ActivityOmit
    productionHoney?: ProductionHoneyOmit
    temperaturesHumidity?: TemperaturesHumidityOmit
    food?: FoodOmit
    disease?: DiseaseOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProducerCountOutputType
   */

  export type ProducerCountOutputType = {
    beehives: number
  }

  export type ProducerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehives?: boolean | ProducerCountOutputTypeCountBeehivesArgs
  }

  // Custom InputTypes
  /**
   * ProducerCountOutputType without action
   */
  export type ProducerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProducerCountOutputType
     */
    select?: ProducerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProducerCountOutputType without action
   */
  export type ProducerCountOutputTypeCountBeehivesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BeehiveWhereInput
  }


  /**
   * Count Type BeehiveCountOutputType
   */

  export type BeehiveCountOutputType = {
    activities: number
    productionsHoney: number
    temperaturesHumidities: number
    foods: number
    diseases: number
  }

  export type BeehiveCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | BeehiveCountOutputTypeCountActivitiesArgs
    productionsHoney?: boolean | BeehiveCountOutputTypeCountProductionsHoneyArgs
    temperaturesHumidities?: boolean | BeehiveCountOutputTypeCountTemperaturesHumiditiesArgs
    foods?: boolean | BeehiveCountOutputTypeCountFoodsArgs
    diseases?: boolean | BeehiveCountOutputTypeCountDiseasesArgs
  }

  // Custom InputTypes
  /**
   * BeehiveCountOutputType without action
   */
  export type BeehiveCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BeehiveCountOutputType
     */
    select?: BeehiveCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BeehiveCountOutputType without action
   */
  export type BeehiveCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }

  /**
   * BeehiveCountOutputType without action
   */
  export type BeehiveCountOutputTypeCountProductionsHoneyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductionHoneyWhereInput
  }

  /**
   * BeehiveCountOutputType without action
   */
  export type BeehiveCountOutputTypeCountTemperaturesHumiditiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemperaturesHumidityWhereInput
  }

  /**
   * BeehiveCountOutputType without action
   */
  export type BeehiveCountOutputTypeCountFoodsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodWhereInput
  }

  /**
   * BeehiveCountOutputType without action
   */
  export type BeehiveCountOutputTypeCountDiseasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiseaseWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Producer
   */

  export type AggregateProducer = {
    _count: ProducerCountAggregateOutputType | null
    _avg: ProducerAvgAggregateOutputType | null
    _sum: ProducerSumAggregateOutputType | null
    _min: ProducerMinAggregateOutputType | null
    _max: ProducerMaxAggregateOutputType | null
  }

  export type ProducerAvgAggregateOutputType = {
    id: number | null
    longitude: number | null
    latitude: number | null
  }

  export type ProducerSumAggregateOutputType = {
    id: number | null
    longitude: number | null
    latitude: number | null
  }

  export type ProducerMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    cpfCnpj: string | null
    longitude: number | null
    latitude: number | null
    startDate: Date | null
    status: string | null
  }

  export type ProducerMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    cpfCnpj: string | null
    longitude: number | null
    latitude: number | null
    startDate: Date | null
    status: string | null
  }

  export type ProducerCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    cpfCnpj: number
    longitude: number
    latitude: number
    startDate: number
    status: number
    _all: number
  }


  export type ProducerAvgAggregateInputType = {
    id?: true
    longitude?: true
    latitude?: true
  }

  export type ProducerSumAggregateInputType = {
    id?: true
    longitude?: true
    latitude?: true
  }

  export type ProducerMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    cpfCnpj?: true
    longitude?: true
    latitude?: true
    startDate?: true
    status?: true
  }

  export type ProducerMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    cpfCnpj?: true
    longitude?: true
    latitude?: true
    startDate?: true
    status?: true
  }

  export type ProducerCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    cpfCnpj?: true
    longitude?: true
    latitude?: true
    startDate?: true
    status?: true
    _all?: true
  }

  export type ProducerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Producer to aggregate.
     */
    where?: ProducerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Producers to fetch.
     */
    orderBy?: ProducerOrderByWithRelationInput | ProducerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProducerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Producers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Producers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Producers
    **/
    _count?: true | ProducerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProducerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProducerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProducerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProducerMaxAggregateInputType
  }

  export type GetProducerAggregateType<T extends ProducerAggregateArgs> = {
        [P in keyof T & keyof AggregateProducer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProducer[P]>
      : GetScalarType<T[P], AggregateProducer[P]>
  }




  export type ProducerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProducerWhereInput
    orderBy?: ProducerOrderByWithAggregationInput | ProducerOrderByWithAggregationInput[]
    by: ProducerScalarFieldEnum[] | ProducerScalarFieldEnum
    having?: ProducerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProducerCountAggregateInputType | true
    _avg?: ProducerAvgAggregateInputType
    _sum?: ProducerSumAggregateInputType
    _min?: ProducerMinAggregateInputType
    _max?: ProducerMaxAggregateInputType
  }

  export type ProducerGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    cpfCnpj: string
    longitude: number
    latitude: number
    startDate: Date
    status: string
    _count: ProducerCountAggregateOutputType | null
    _avg: ProducerAvgAggregateOutputType | null
    _sum: ProducerSumAggregateOutputType | null
    _min: ProducerMinAggregateOutputType | null
    _max: ProducerMaxAggregateOutputType | null
  }

  type GetProducerGroupByPayload<T extends ProducerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProducerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProducerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProducerGroupByOutputType[P]>
            : GetScalarType<T[P], ProducerGroupByOutputType[P]>
        }
      >
    >


  export type ProducerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    cpfCnpj?: boolean
    longitude?: boolean
    latitude?: boolean
    startDate?: boolean
    status?: boolean
    beehives?: boolean | Producer$beehivesArgs<ExtArgs>
    _count?: boolean | ProducerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["producer"]>

  export type ProducerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    cpfCnpj?: boolean
    longitude?: boolean
    latitude?: boolean
    startDate?: boolean
    status?: boolean
  }, ExtArgs["result"]["producer"]>

  export type ProducerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    cpfCnpj?: boolean
    longitude?: boolean
    latitude?: boolean
    startDate?: boolean
    status?: boolean
  }, ExtArgs["result"]["producer"]>

  export type ProducerSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    cpfCnpj?: boolean
    longitude?: boolean
    latitude?: boolean
    startDate?: boolean
    status?: boolean
  }

  export type ProducerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "cpfCnpj" | "longitude" | "latitude" | "startDate" | "status", ExtArgs["result"]["producer"]>
  export type ProducerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehives?: boolean | Producer$beehivesArgs<ExtArgs>
    _count?: boolean | ProducerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProducerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProducerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProducerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Producer"
    objects: {
      beehives: Prisma.$BeehivePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
      cpfCnpj: string
      longitude: number
      latitude: number
      startDate: Date
      status: string
    }, ExtArgs["result"]["producer"]>
    composites: {}
  }

  type ProducerGetPayload<S extends boolean | null | undefined | ProducerDefaultArgs> = $Result.GetResult<Prisma.$ProducerPayload, S>

  type ProducerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProducerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProducerCountAggregateInputType | true
    }

  export interface ProducerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Producer'], meta: { name: 'Producer' } }
    /**
     * Find zero or one Producer that matches the filter.
     * @param {ProducerFindUniqueArgs} args - Arguments to find a Producer
     * @example
     * // Get one Producer
     * const producer = await prisma.producer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProducerFindUniqueArgs>(args: SelectSubset<T, ProducerFindUniqueArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Producer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProducerFindUniqueOrThrowArgs} args - Arguments to find a Producer
     * @example
     * // Get one Producer
     * const producer = await prisma.producer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProducerFindUniqueOrThrowArgs>(args: SelectSubset<T, ProducerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Producer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProducerFindFirstArgs} args - Arguments to find a Producer
     * @example
     * // Get one Producer
     * const producer = await prisma.producer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProducerFindFirstArgs>(args?: SelectSubset<T, ProducerFindFirstArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Producer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProducerFindFirstOrThrowArgs} args - Arguments to find a Producer
     * @example
     * // Get one Producer
     * const producer = await prisma.producer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProducerFindFirstOrThrowArgs>(args?: SelectSubset<T, ProducerFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Producers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProducerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Producers
     * const producers = await prisma.producer.findMany()
     * 
     * // Get first 10 Producers
     * const producers = await prisma.producer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const producerWithIdOnly = await prisma.producer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProducerFindManyArgs>(args?: SelectSubset<T, ProducerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Producer.
     * @param {ProducerCreateArgs} args - Arguments to create a Producer.
     * @example
     * // Create one Producer
     * const Producer = await prisma.producer.create({
     *   data: {
     *     // ... data to create a Producer
     *   }
     * })
     * 
     */
    create<T extends ProducerCreateArgs>(args: SelectSubset<T, ProducerCreateArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Producers.
     * @param {ProducerCreateManyArgs} args - Arguments to create many Producers.
     * @example
     * // Create many Producers
     * const producer = await prisma.producer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProducerCreateManyArgs>(args?: SelectSubset<T, ProducerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Producers and returns the data saved in the database.
     * @param {ProducerCreateManyAndReturnArgs} args - Arguments to create many Producers.
     * @example
     * // Create many Producers
     * const producer = await prisma.producer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Producers and only return the `id`
     * const producerWithIdOnly = await prisma.producer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProducerCreateManyAndReturnArgs>(args?: SelectSubset<T, ProducerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Producer.
     * @param {ProducerDeleteArgs} args - Arguments to delete one Producer.
     * @example
     * // Delete one Producer
     * const Producer = await prisma.producer.delete({
     *   where: {
     *     // ... filter to delete one Producer
     *   }
     * })
     * 
     */
    delete<T extends ProducerDeleteArgs>(args: SelectSubset<T, ProducerDeleteArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Producer.
     * @param {ProducerUpdateArgs} args - Arguments to update one Producer.
     * @example
     * // Update one Producer
     * const producer = await prisma.producer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProducerUpdateArgs>(args: SelectSubset<T, ProducerUpdateArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Producers.
     * @param {ProducerDeleteManyArgs} args - Arguments to filter Producers to delete.
     * @example
     * // Delete a few Producers
     * const { count } = await prisma.producer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProducerDeleteManyArgs>(args?: SelectSubset<T, ProducerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Producers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProducerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Producers
     * const producer = await prisma.producer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProducerUpdateManyArgs>(args: SelectSubset<T, ProducerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Producers and returns the data updated in the database.
     * @param {ProducerUpdateManyAndReturnArgs} args - Arguments to update many Producers.
     * @example
     * // Update many Producers
     * const producer = await prisma.producer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Producers and only return the `id`
     * const producerWithIdOnly = await prisma.producer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProducerUpdateManyAndReturnArgs>(args: SelectSubset<T, ProducerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Producer.
     * @param {ProducerUpsertArgs} args - Arguments to update or create a Producer.
     * @example
     * // Update or create a Producer
     * const producer = await prisma.producer.upsert({
     *   create: {
     *     // ... data to create a Producer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Producer we want to update
     *   }
     * })
     */
    upsert<T extends ProducerUpsertArgs>(args: SelectSubset<T, ProducerUpsertArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Producers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProducerCountArgs} args - Arguments to filter Producers to count.
     * @example
     * // Count the number of Producers
     * const count = await prisma.producer.count({
     *   where: {
     *     // ... the filter for the Producers we want to count
     *   }
     * })
    **/
    count<T extends ProducerCountArgs>(
      args?: Subset<T, ProducerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProducerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Producer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProducerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProducerAggregateArgs>(args: Subset<T, ProducerAggregateArgs>): Prisma.PrismaPromise<GetProducerAggregateType<T>>

    /**
     * Group by Producer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProducerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProducerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProducerGroupByArgs['orderBy'] }
        : { orderBy?: ProducerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProducerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProducerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Producer model
   */
  readonly fields: ProducerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Producer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProducerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    beehives<T extends Producer$beehivesArgs<ExtArgs> = {}>(args?: Subset<T, Producer$beehivesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Producer model
   */
  interface ProducerFieldRefs {
    readonly id: FieldRef<"Producer", 'Int'>
    readonly name: FieldRef<"Producer", 'String'>
    readonly email: FieldRef<"Producer", 'String'>
    readonly password: FieldRef<"Producer", 'String'>
    readonly cpfCnpj: FieldRef<"Producer", 'String'>
    readonly longitude: FieldRef<"Producer", 'Float'>
    readonly latitude: FieldRef<"Producer", 'Float'>
    readonly startDate: FieldRef<"Producer", 'DateTime'>
    readonly status: FieldRef<"Producer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Producer findUnique
   */
  export type ProducerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * Filter, which Producer to fetch.
     */
    where: ProducerWhereUniqueInput
  }

  /**
   * Producer findUniqueOrThrow
   */
  export type ProducerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * Filter, which Producer to fetch.
     */
    where: ProducerWhereUniqueInput
  }

  /**
   * Producer findFirst
   */
  export type ProducerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * Filter, which Producer to fetch.
     */
    where?: ProducerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Producers to fetch.
     */
    orderBy?: ProducerOrderByWithRelationInput | ProducerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Producers.
     */
    cursor?: ProducerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Producers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Producers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Producers.
     */
    distinct?: ProducerScalarFieldEnum | ProducerScalarFieldEnum[]
  }

  /**
   * Producer findFirstOrThrow
   */
  export type ProducerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * Filter, which Producer to fetch.
     */
    where?: ProducerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Producers to fetch.
     */
    orderBy?: ProducerOrderByWithRelationInput | ProducerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Producers.
     */
    cursor?: ProducerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Producers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Producers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Producers.
     */
    distinct?: ProducerScalarFieldEnum | ProducerScalarFieldEnum[]
  }

  /**
   * Producer findMany
   */
  export type ProducerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * Filter, which Producers to fetch.
     */
    where?: ProducerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Producers to fetch.
     */
    orderBy?: ProducerOrderByWithRelationInput | ProducerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Producers.
     */
    cursor?: ProducerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Producers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Producers.
     */
    skip?: number
    distinct?: ProducerScalarFieldEnum | ProducerScalarFieldEnum[]
  }

  /**
   * Producer create
   */
  export type ProducerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * The data needed to create a Producer.
     */
    data: XOR<ProducerCreateInput, ProducerUncheckedCreateInput>
  }

  /**
   * Producer createMany
   */
  export type ProducerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Producers.
     */
    data: ProducerCreateManyInput | ProducerCreateManyInput[]
  }

  /**
   * Producer createManyAndReturn
   */
  export type ProducerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * The data used to create many Producers.
     */
    data: ProducerCreateManyInput | ProducerCreateManyInput[]
  }

  /**
   * Producer update
   */
  export type ProducerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * The data needed to update a Producer.
     */
    data: XOR<ProducerUpdateInput, ProducerUncheckedUpdateInput>
    /**
     * Choose, which Producer to update.
     */
    where: ProducerWhereUniqueInput
  }

  /**
   * Producer updateMany
   */
  export type ProducerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Producers.
     */
    data: XOR<ProducerUpdateManyMutationInput, ProducerUncheckedUpdateManyInput>
    /**
     * Filter which Producers to update
     */
    where?: ProducerWhereInput
    /**
     * Limit how many Producers to update.
     */
    limit?: number
  }

  /**
   * Producer updateManyAndReturn
   */
  export type ProducerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * The data used to update Producers.
     */
    data: XOR<ProducerUpdateManyMutationInput, ProducerUncheckedUpdateManyInput>
    /**
     * Filter which Producers to update
     */
    where?: ProducerWhereInput
    /**
     * Limit how many Producers to update.
     */
    limit?: number
  }

  /**
   * Producer upsert
   */
  export type ProducerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * The filter to search for the Producer to update in case it exists.
     */
    where: ProducerWhereUniqueInput
    /**
     * In case the Producer found by the `where` argument doesn't exist, create a new Producer with this data.
     */
    create: XOR<ProducerCreateInput, ProducerUncheckedCreateInput>
    /**
     * In case the Producer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProducerUpdateInput, ProducerUncheckedUpdateInput>
  }

  /**
   * Producer delete
   */
  export type ProducerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
    /**
     * Filter which Producer to delete.
     */
    where: ProducerWhereUniqueInput
  }

  /**
   * Producer deleteMany
   */
  export type ProducerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Producers to delete
     */
    where?: ProducerWhereInput
    /**
     * Limit how many Producers to delete.
     */
    limit?: number
  }

  /**
   * Producer.beehives
   */
  export type Producer$beehivesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beehive
     */
    select?: BeehiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Beehive
     */
    omit?: BeehiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeehiveInclude<ExtArgs> | null
    where?: BeehiveWhereInput
    orderBy?: BeehiveOrderByWithRelationInput | BeehiveOrderByWithRelationInput[]
    cursor?: BeehiveWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BeehiveScalarFieldEnum | BeehiveScalarFieldEnum[]
  }

  /**
   * Producer without action
   */
  export type ProducerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producer
     */
    select?: ProducerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producer
     */
    omit?: ProducerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProducerInclude<ExtArgs> | null
  }


  /**
   * Model Beehive
   */

  export type AggregateBeehive = {
    _count: BeehiveCountAggregateOutputType | null
    _avg: BeehiveAvgAggregateOutputType | null
    _sum: BeehiveSumAggregateOutputType | null
    _min: BeehiveMinAggregateOutputType | null
    _max: BeehiveMaxAggregateOutputType | null
  }

  export type BeehiveAvgAggregateOutputType = {
    id: number | null
    producerId: number | null
    longitude: number | null
    latitude: number | null
  }

  export type BeehiveSumAggregateOutputType = {
    id: number | null
    producerId: number | null
    longitude: number | null
    latitude: number | null
  }

  export type BeehiveMinAggregateOutputType = {
    id: number | null
    producerId: number | null
    name: string | null
    longitude: number | null
    latitude: number | null
    startDate: Date | null
    status: string | null
    typeBeehive: string | null
    observations: string | null
  }

  export type BeehiveMaxAggregateOutputType = {
    id: number | null
    producerId: number | null
    name: string | null
    longitude: number | null
    latitude: number | null
    startDate: Date | null
    status: string | null
    typeBeehive: string | null
    observations: string | null
  }

  export type BeehiveCountAggregateOutputType = {
    id: number
    producerId: number
    name: number
    longitude: number
    latitude: number
    startDate: number
    status: number
    typeBeehive: number
    observations: number
    _all: number
  }


  export type BeehiveAvgAggregateInputType = {
    id?: true
    producerId?: true
    longitude?: true
    latitude?: true
  }

  export type BeehiveSumAggregateInputType = {
    id?: true
    producerId?: true
    longitude?: true
    latitude?: true
  }

  export type BeehiveMinAggregateInputType = {
    id?: true
    producerId?: true
    name?: true
    longitude?: true
    latitude?: true
    startDate?: true
    status?: true
    typeBeehive?: true
    observations?: true
  }

  export type BeehiveMaxAggregateInputType = {
    id?: true
    producerId?: true
    name?: true
    longitude?: true
    latitude?: true
    startDate?: true
    status?: true
    typeBeehive?: true
    observations?: true
  }

  export type BeehiveCountAggregateInputType = {
    id?: true
    producerId?: true
    name?: true
    longitude?: true
    latitude?: true
    startDate?: true
    status?: true
    typeBeehive?: true
    observations?: true
    _all?: true
  }

  export type BeehiveAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Beehive to aggregate.
     */
    where?: BeehiveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Beehives to fetch.
     */
    orderBy?: BeehiveOrderByWithRelationInput | BeehiveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BeehiveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Beehives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Beehives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Beehives
    **/
    _count?: true | BeehiveCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BeehiveAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BeehiveSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BeehiveMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BeehiveMaxAggregateInputType
  }

  export type GetBeehiveAggregateType<T extends BeehiveAggregateArgs> = {
        [P in keyof T & keyof AggregateBeehive]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBeehive[P]>
      : GetScalarType<T[P], AggregateBeehive[P]>
  }




  export type BeehiveGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BeehiveWhereInput
    orderBy?: BeehiveOrderByWithAggregationInput | BeehiveOrderByWithAggregationInput[]
    by: BeehiveScalarFieldEnum[] | BeehiveScalarFieldEnum
    having?: BeehiveScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BeehiveCountAggregateInputType | true
    _avg?: BeehiveAvgAggregateInputType
    _sum?: BeehiveSumAggregateInputType
    _min?: BeehiveMinAggregateInputType
    _max?: BeehiveMaxAggregateInputType
  }

  export type BeehiveGroupByOutputType = {
    id: number
    producerId: number
    name: string
    longitude: number
    latitude: number
    startDate: Date
    status: string
    typeBeehive: string
    observations: string | null
    _count: BeehiveCountAggregateOutputType | null
    _avg: BeehiveAvgAggregateOutputType | null
    _sum: BeehiveSumAggregateOutputType | null
    _min: BeehiveMinAggregateOutputType | null
    _max: BeehiveMaxAggregateOutputType | null
  }

  type GetBeehiveGroupByPayload<T extends BeehiveGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BeehiveGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BeehiveGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BeehiveGroupByOutputType[P]>
            : GetScalarType<T[P], BeehiveGroupByOutputType[P]>
        }
      >
    >


  export type BeehiveSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    producerId?: boolean
    name?: boolean
    longitude?: boolean
    latitude?: boolean
    startDate?: boolean
    status?: boolean
    typeBeehive?: boolean
    observations?: boolean
    producer?: boolean | ProducerDefaultArgs<ExtArgs>
    activities?: boolean | Beehive$activitiesArgs<ExtArgs>
    productionsHoney?: boolean | Beehive$productionsHoneyArgs<ExtArgs>
    temperaturesHumidities?: boolean | Beehive$temperaturesHumiditiesArgs<ExtArgs>
    foods?: boolean | Beehive$foodsArgs<ExtArgs>
    diseases?: boolean | Beehive$diseasesArgs<ExtArgs>
    _count?: boolean | BeehiveCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["beehive"]>

  export type BeehiveSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    producerId?: boolean
    name?: boolean
    longitude?: boolean
    latitude?: boolean
    startDate?: boolean
    status?: boolean
    typeBeehive?: boolean
    observations?: boolean
    producer?: boolean | ProducerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["beehive"]>

  export type BeehiveSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    producerId?: boolean
    name?: boolean
    longitude?: boolean
    latitude?: boolean
    startDate?: boolean
    status?: boolean
    typeBeehive?: boolean
    observations?: boolean
    producer?: boolean | ProducerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["beehive"]>

  export type BeehiveSelectScalar = {
    id?: boolean
    producerId?: boolean
    name?: boolean
    longitude?: boolean
    latitude?: boolean
    startDate?: boolean
    status?: boolean
    typeBeehive?: boolean
    observations?: boolean
  }

  export type BeehiveOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "producerId" | "name" | "longitude" | "latitude" | "startDate" | "status" | "typeBeehive" | "observations", ExtArgs["result"]["beehive"]>
  export type BeehiveInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producer?: boolean | ProducerDefaultArgs<ExtArgs>
    activities?: boolean | Beehive$activitiesArgs<ExtArgs>
    productionsHoney?: boolean | Beehive$productionsHoneyArgs<ExtArgs>
    temperaturesHumidities?: boolean | Beehive$temperaturesHumiditiesArgs<ExtArgs>
    foods?: boolean | Beehive$foodsArgs<ExtArgs>
    diseases?: boolean | Beehive$diseasesArgs<ExtArgs>
    _count?: boolean | BeehiveCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BeehiveIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producer?: boolean | ProducerDefaultArgs<ExtArgs>
  }
  export type BeehiveIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producer?: boolean | ProducerDefaultArgs<ExtArgs>
  }

  export type $BeehivePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Beehive"
    objects: {
      producer: Prisma.$ProducerPayload<ExtArgs>
      activities: Prisma.$ActivityPayload<ExtArgs>[]
      productionsHoney: Prisma.$ProductionHoneyPayload<ExtArgs>[]
      temperaturesHumidities: Prisma.$TemperaturesHumidityPayload<ExtArgs>[]
      foods: Prisma.$FoodPayload<ExtArgs>[]
      diseases: Prisma.$DiseasePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      producerId: number
      name: string
      longitude: number
      latitude: number
      startDate: Date
      status: string
      typeBeehive: string
      observations: string | null
    }, ExtArgs["result"]["beehive"]>
    composites: {}
  }

  type BeehiveGetPayload<S extends boolean | null | undefined | BeehiveDefaultArgs> = $Result.GetResult<Prisma.$BeehivePayload, S>

  type BeehiveCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BeehiveFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BeehiveCountAggregateInputType | true
    }

  export interface BeehiveDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Beehive'], meta: { name: 'Beehive' } }
    /**
     * Find zero or one Beehive that matches the filter.
     * @param {BeehiveFindUniqueArgs} args - Arguments to find a Beehive
     * @example
     * // Get one Beehive
     * const beehive = await prisma.beehive.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BeehiveFindUniqueArgs>(args: SelectSubset<T, BeehiveFindUniqueArgs<ExtArgs>>): Prisma__BeehiveClient<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Beehive that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BeehiveFindUniqueOrThrowArgs} args - Arguments to find a Beehive
     * @example
     * // Get one Beehive
     * const beehive = await prisma.beehive.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BeehiveFindUniqueOrThrowArgs>(args: SelectSubset<T, BeehiveFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BeehiveClient<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Beehive that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeehiveFindFirstArgs} args - Arguments to find a Beehive
     * @example
     * // Get one Beehive
     * const beehive = await prisma.beehive.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BeehiveFindFirstArgs>(args?: SelectSubset<T, BeehiveFindFirstArgs<ExtArgs>>): Prisma__BeehiveClient<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Beehive that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeehiveFindFirstOrThrowArgs} args - Arguments to find a Beehive
     * @example
     * // Get one Beehive
     * const beehive = await prisma.beehive.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BeehiveFindFirstOrThrowArgs>(args?: SelectSubset<T, BeehiveFindFirstOrThrowArgs<ExtArgs>>): Prisma__BeehiveClient<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Beehives that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeehiveFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Beehives
     * const beehives = await prisma.beehive.findMany()
     * 
     * // Get first 10 Beehives
     * const beehives = await prisma.beehive.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const beehiveWithIdOnly = await prisma.beehive.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BeehiveFindManyArgs>(args?: SelectSubset<T, BeehiveFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Beehive.
     * @param {BeehiveCreateArgs} args - Arguments to create a Beehive.
     * @example
     * // Create one Beehive
     * const Beehive = await prisma.beehive.create({
     *   data: {
     *     // ... data to create a Beehive
     *   }
     * })
     * 
     */
    create<T extends BeehiveCreateArgs>(args: SelectSubset<T, BeehiveCreateArgs<ExtArgs>>): Prisma__BeehiveClient<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Beehives.
     * @param {BeehiveCreateManyArgs} args - Arguments to create many Beehives.
     * @example
     * // Create many Beehives
     * const beehive = await prisma.beehive.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BeehiveCreateManyArgs>(args?: SelectSubset<T, BeehiveCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Beehives and returns the data saved in the database.
     * @param {BeehiveCreateManyAndReturnArgs} args - Arguments to create many Beehives.
     * @example
     * // Create many Beehives
     * const beehive = await prisma.beehive.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Beehives and only return the `id`
     * const beehiveWithIdOnly = await prisma.beehive.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BeehiveCreateManyAndReturnArgs>(args?: SelectSubset<T, BeehiveCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Beehive.
     * @param {BeehiveDeleteArgs} args - Arguments to delete one Beehive.
     * @example
     * // Delete one Beehive
     * const Beehive = await prisma.beehive.delete({
     *   where: {
     *     // ... filter to delete one Beehive
     *   }
     * })
     * 
     */
    delete<T extends BeehiveDeleteArgs>(args: SelectSubset<T, BeehiveDeleteArgs<ExtArgs>>): Prisma__BeehiveClient<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Beehive.
     * @param {BeehiveUpdateArgs} args - Arguments to update one Beehive.
     * @example
     * // Update one Beehive
     * const beehive = await prisma.beehive.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BeehiveUpdateArgs>(args: SelectSubset<T, BeehiveUpdateArgs<ExtArgs>>): Prisma__BeehiveClient<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Beehives.
     * @param {BeehiveDeleteManyArgs} args - Arguments to filter Beehives to delete.
     * @example
     * // Delete a few Beehives
     * const { count } = await prisma.beehive.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BeehiveDeleteManyArgs>(args?: SelectSubset<T, BeehiveDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Beehives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeehiveUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Beehives
     * const beehive = await prisma.beehive.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BeehiveUpdateManyArgs>(args: SelectSubset<T, BeehiveUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Beehives and returns the data updated in the database.
     * @param {BeehiveUpdateManyAndReturnArgs} args - Arguments to update many Beehives.
     * @example
     * // Update many Beehives
     * const beehive = await prisma.beehive.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Beehives and only return the `id`
     * const beehiveWithIdOnly = await prisma.beehive.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BeehiveUpdateManyAndReturnArgs>(args: SelectSubset<T, BeehiveUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Beehive.
     * @param {BeehiveUpsertArgs} args - Arguments to update or create a Beehive.
     * @example
     * // Update or create a Beehive
     * const beehive = await prisma.beehive.upsert({
     *   create: {
     *     // ... data to create a Beehive
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Beehive we want to update
     *   }
     * })
     */
    upsert<T extends BeehiveUpsertArgs>(args: SelectSubset<T, BeehiveUpsertArgs<ExtArgs>>): Prisma__BeehiveClient<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Beehives.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeehiveCountArgs} args - Arguments to filter Beehives to count.
     * @example
     * // Count the number of Beehives
     * const count = await prisma.beehive.count({
     *   where: {
     *     // ... the filter for the Beehives we want to count
     *   }
     * })
    **/
    count<T extends BeehiveCountArgs>(
      args?: Subset<T, BeehiveCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BeehiveCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Beehive.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeehiveAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BeehiveAggregateArgs>(args: Subset<T, BeehiveAggregateArgs>): Prisma.PrismaPromise<GetBeehiveAggregateType<T>>

    /**
     * Group by Beehive.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeehiveGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BeehiveGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BeehiveGroupByArgs['orderBy'] }
        : { orderBy?: BeehiveGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BeehiveGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBeehiveGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Beehive model
   */
  readonly fields: BeehiveFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Beehive.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BeehiveClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    producer<T extends ProducerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProducerDefaultArgs<ExtArgs>>): Prisma__ProducerClient<$Result.GetResult<Prisma.$ProducerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    activities<T extends Beehive$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Beehive$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    productionsHoney<T extends Beehive$productionsHoneyArgs<ExtArgs> = {}>(args?: Subset<T, Beehive$productionsHoneyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductionHoneyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    temperaturesHumidities<T extends Beehive$temperaturesHumiditiesArgs<ExtArgs> = {}>(args?: Subset<T, Beehive$temperaturesHumiditiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemperaturesHumidityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    foods<T extends Beehive$foodsArgs<ExtArgs> = {}>(args?: Subset<T, Beehive$foodsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    diseases<T extends Beehive$diseasesArgs<ExtArgs> = {}>(args?: Subset<T, Beehive$diseasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Beehive model
   */
  interface BeehiveFieldRefs {
    readonly id: FieldRef<"Beehive", 'Int'>
    readonly producerId: FieldRef<"Beehive", 'Int'>
    readonly name: FieldRef<"Beehive", 'String'>
    readonly longitude: FieldRef<"Beehive", 'Float'>
    readonly latitude: FieldRef<"Beehive", 'Float'>
    readonly startDate: FieldRef<"Beehive", 'DateTime'>
    readonly status: FieldRef<"Beehive", 'String'>
    readonly typeBeehive: FieldRef<"Beehive", 'String'>
    readonly observations: FieldRef<"Beehive", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Beehive findUnique
   */
  export type BeehiveFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beehive
     */
    select?: BeehiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Beehive
     */
    omit?: BeehiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeehiveInclude<ExtArgs> | null
    /**
     * Filter, which Beehive to fetch.
     */
    where: BeehiveWhereUniqueInput
  }

  /**
   * Beehive findUniqueOrThrow
   */
  export type BeehiveFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beehive
     */
    select?: BeehiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Beehive
     */
    omit?: BeehiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeehiveInclude<ExtArgs> | null
    /**
     * Filter, which Beehive to fetch.
     */
    where: BeehiveWhereUniqueInput
  }

  /**
   * Beehive findFirst
   */
  export type BeehiveFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beehive
     */
    select?: BeehiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Beehive
     */
    omit?: BeehiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeehiveInclude<ExtArgs> | null
    /**
     * Filter, which Beehive to fetch.
     */
    where?: BeehiveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Beehives to fetch.
     */
    orderBy?: BeehiveOrderByWithRelationInput | BeehiveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Beehives.
     */
    cursor?: BeehiveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Beehives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Beehives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Beehives.
     */
    distinct?: BeehiveScalarFieldEnum | BeehiveScalarFieldEnum[]
  }

  /**
   * Beehive findFirstOrThrow
   */
  export type BeehiveFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beehive
     */
    select?: BeehiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Beehive
     */
    omit?: BeehiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeehiveInclude<ExtArgs> | null
    /**
     * Filter, which Beehive to fetch.
     */
    where?: BeehiveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Beehives to fetch.
     */
    orderBy?: BeehiveOrderByWithRelationInput | BeehiveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Beehives.
     */
    cursor?: BeehiveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Beehives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Beehives.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Beehives.
     */
    distinct?: BeehiveScalarFieldEnum | BeehiveScalarFieldEnum[]
  }

  /**
   * Beehive findMany
   */
  export type BeehiveFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beehive
     */
    select?: BeehiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Beehive
     */
    omit?: BeehiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeehiveInclude<ExtArgs> | null
    /**
     * Filter, which Beehives to fetch.
     */
    where?: BeehiveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Beehives to fetch.
     */
    orderBy?: BeehiveOrderByWithRelationInput | BeehiveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Beehives.
     */
    cursor?: BeehiveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Beehives from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Beehives.
     */
    skip?: number
    distinct?: BeehiveScalarFieldEnum | BeehiveScalarFieldEnum[]
  }

  /**
   * Beehive create
   */
  export type BeehiveCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beehive
     */
    select?: BeehiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Beehive
     */
    omit?: BeehiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeehiveInclude<ExtArgs> | null
    /**
     * The data needed to create a Beehive.
     */
    data: XOR<BeehiveCreateInput, BeehiveUncheckedCreateInput>
  }

  /**
   * Beehive createMany
   */
  export type BeehiveCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Beehives.
     */
    data: BeehiveCreateManyInput | BeehiveCreateManyInput[]
  }

  /**
   * Beehive createManyAndReturn
   */
  export type BeehiveCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beehive
     */
    select?: BeehiveSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Beehive
     */
    omit?: BeehiveOmit<ExtArgs> | null
    /**
     * The data used to create many Beehives.
     */
    data: BeehiveCreateManyInput | BeehiveCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeehiveIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Beehive update
   */
  export type BeehiveUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beehive
     */
    select?: BeehiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Beehive
     */
    omit?: BeehiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeehiveInclude<ExtArgs> | null
    /**
     * The data needed to update a Beehive.
     */
    data: XOR<BeehiveUpdateInput, BeehiveUncheckedUpdateInput>
    /**
     * Choose, which Beehive to update.
     */
    where: BeehiveWhereUniqueInput
  }

  /**
   * Beehive updateMany
   */
  export type BeehiveUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Beehives.
     */
    data: XOR<BeehiveUpdateManyMutationInput, BeehiveUncheckedUpdateManyInput>
    /**
     * Filter which Beehives to update
     */
    where?: BeehiveWhereInput
    /**
     * Limit how many Beehives to update.
     */
    limit?: number
  }

  /**
   * Beehive updateManyAndReturn
   */
  export type BeehiveUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beehive
     */
    select?: BeehiveSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Beehive
     */
    omit?: BeehiveOmit<ExtArgs> | null
    /**
     * The data used to update Beehives.
     */
    data: XOR<BeehiveUpdateManyMutationInput, BeehiveUncheckedUpdateManyInput>
    /**
     * Filter which Beehives to update
     */
    where?: BeehiveWhereInput
    /**
     * Limit how many Beehives to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeehiveIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Beehive upsert
   */
  export type BeehiveUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beehive
     */
    select?: BeehiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Beehive
     */
    omit?: BeehiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeehiveInclude<ExtArgs> | null
    /**
     * The filter to search for the Beehive to update in case it exists.
     */
    where: BeehiveWhereUniqueInput
    /**
     * In case the Beehive found by the `where` argument doesn't exist, create a new Beehive with this data.
     */
    create: XOR<BeehiveCreateInput, BeehiveUncheckedCreateInput>
    /**
     * In case the Beehive was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BeehiveUpdateInput, BeehiveUncheckedUpdateInput>
  }

  /**
   * Beehive delete
   */
  export type BeehiveDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beehive
     */
    select?: BeehiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Beehive
     */
    omit?: BeehiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeehiveInclude<ExtArgs> | null
    /**
     * Filter which Beehive to delete.
     */
    where: BeehiveWhereUniqueInput
  }

  /**
   * Beehive deleteMany
   */
  export type BeehiveDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Beehives to delete
     */
    where?: BeehiveWhereInput
    /**
     * Limit how many Beehives to delete.
     */
    limit?: number
  }

  /**
   * Beehive.activities
   */
  export type Beehive$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Beehive.productionsHoney
   */
  export type Beehive$productionsHoneyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionHoney
     */
    select?: ProductionHoneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionHoney
     */
    omit?: ProductionHoneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionHoneyInclude<ExtArgs> | null
    where?: ProductionHoneyWhereInput
    orderBy?: ProductionHoneyOrderByWithRelationInput | ProductionHoneyOrderByWithRelationInput[]
    cursor?: ProductionHoneyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductionHoneyScalarFieldEnum | ProductionHoneyScalarFieldEnum[]
  }

  /**
   * Beehive.temperaturesHumidities
   */
  export type Beehive$temperaturesHumiditiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemperaturesHumidity
     */
    select?: TemperaturesHumiditySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemperaturesHumidity
     */
    omit?: TemperaturesHumidityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemperaturesHumidityInclude<ExtArgs> | null
    where?: TemperaturesHumidityWhereInput
    orderBy?: TemperaturesHumidityOrderByWithRelationInput | TemperaturesHumidityOrderByWithRelationInput[]
    cursor?: TemperaturesHumidityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TemperaturesHumidityScalarFieldEnum | TemperaturesHumidityScalarFieldEnum[]
  }

  /**
   * Beehive.foods
   */
  export type Beehive$foodsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    where?: FoodWhereInput
    orderBy?: FoodOrderByWithRelationInput | FoodOrderByWithRelationInput[]
    cursor?: FoodWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FoodScalarFieldEnum | FoodScalarFieldEnum[]
  }

  /**
   * Beehive.diseases
   */
  export type Beehive$diseasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    where?: DiseaseWhereInput
    orderBy?: DiseaseOrderByWithRelationInput | DiseaseOrderByWithRelationInput[]
    cursor?: DiseaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiseaseScalarFieldEnum | DiseaseScalarFieldEnum[]
  }

  /**
   * Beehive without action
   */
  export type BeehiveDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Beehive
     */
    select?: BeehiveSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Beehive
     */
    omit?: BeehiveOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeehiveInclude<ExtArgs> | null
  }


  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityAvgAggregateOutputType = {
    id: number | null
    beehiveId: number | null
  }

  export type ActivitySumAggregateOutputType = {
    id: number | null
    beehiveId: number | null
  }

  export type ActivityMinAggregateOutputType = {
    id: number | null
    beehiveId: number | null
    dateActivity: Date | null
    typeActivity: string | null
    descriptions: string | null
    observations: string | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: number | null
    beehiveId: number | null
    dateActivity: Date | null
    typeActivity: string | null
    descriptions: string | null
    observations: string | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    beehiveId: number
    dateActivity: number
    typeActivity: number
    descriptions: number
    observations: number
    _all: number
  }


  export type ActivityAvgAggregateInputType = {
    id?: true
    beehiveId?: true
  }

  export type ActivitySumAggregateInputType = {
    id?: true
    beehiveId?: true
  }

  export type ActivityMinAggregateInputType = {
    id?: true
    beehiveId?: true
    dateActivity?: true
    typeActivity?: true
    descriptions?: true
    observations?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    beehiveId?: true
    dateActivity?: true
    typeActivity?: true
    descriptions?: true
    observations?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    beehiveId?: true
    dateActivity?: true
    typeActivity?: true
    descriptions?: true
    observations?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithAggregationInput | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _avg?: ActivityAvgAggregateInputType
    _sum?: ActivitySumAggregateInputType
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: number
    beehiveId: number
    dateActivity: Date
    typeActivity: string
    descriptions: string
    observations: string | null
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    beehiveId?: boolean
    dateActivity?: boolean
    typeActivity?: boolean
    descriptions?: boolean
    observations?: boolean
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    beehiveId?: boolean
    dateActivity?: boolean
    typeActivity?: boolean
    descriptions?: boolean
    observations?: boolean
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    beehiveId?: boolean
    dateActivity?: boolean
    typeActivity?: boolean
    descriptions?: boolean
    observations?: boolean
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectScalar = {
    id?: boolean
    beehiveId?: boolean
    dateActivity?: boolean
    typeActivity?: boolean
    descriptions?: boolean
    observations?: boolean
  }

  export type ActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "beehiveId" | "dateActivity" | "typeActivity" | "descriptions" | "observations", ExtArgs["result"]["activity"]>
  export type ActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }
  export type ActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }
  export type ActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }

  export type $ActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activity"
    objects: {
      beehive: Prisma.$BeehivePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      beehiveId: number
      dateActivity: Date
      typeActivity: string
      descriptions: string
      observations: string | null
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }

  type ActivityGetPayload<S extends boolean | null | undefined | ActivityDefaultArgs> = $Result.GetResult<Prisma.$ActivityPayload, S>

  type ActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface ActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activity'], meta: { name: 'Activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityFindUniqueArgs>(args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Activity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityFindFirstArgs>(args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityFindManyArgs>(args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
     */
    create<T extends ActivityCreateArgs>(args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Activities.
     * @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCreateManyArgs>(args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activities and returns the data saved in the database.
     * @param {ActivityCreateManyAndReturnArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
     */
    delete<T extends ActivityDeleteArgs>(args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityUpdateArgs>(args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityDeleteManyArgs>(args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityUpdateManyArgs>(args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities and returns the data updated in the database.
     * @param {ActivityUpdateManyAndReturnArgs} args - Arguments to update many Activities.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
     */
    upsert<T extends ActivityUpsertArgs>(args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activity model
   */
  readonly fields: ActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    beehive<T extends BeehiveDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BeehiveDefaultArgs<ExtArgs>>): Prisma__BeehiveClient<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Activity model
   */
  interface ActivityFieldRefs {
    readonly id: FieldRef<"Activity", 'Int'>
    readonly beehiveId: FieldRef<"Activity", 'Int'>
    readonly dateActivity: FieldRef<"Activity", 'DateTime'>
    readonly typeActivity: FieldRef<"Activity", 'String'>
    readonly descriptions: FieldRef<"Activity", 'String'>
    readonly observations: FieldRef<"Activity", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
  }

  /**
   * Activity createManyAndReturn
   */
  export type ActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
  }

  /**
   * Activity updateManyAndReturn
   */
  export type ActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to delete.
     */
    limit?: number
  }

  /**
   * Activity without action
   */
  export type ActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
  }


  /**
   * Model ProductionHoney
   */

  export type AggregateProductionHoney = {
    _count: ProductionHoneyCountAggregateOutputType | null
    _avg: ProductionHoneyAvgAggregateOutputType | null
    _sum: ProductionHoneySumAggregateOutputType | null
    _min: ProductionHoneyMinAggregateOutputType | null
    _max: ProductionHoneyMaxAggregateOutputType | null
  }

  export type ProductionHoneyAvgAggregateOutputType = {
    id: number | null
    beehiveId: number | null
    amount: Decimal | null
  }

  export type ProductionHoneySumAggregateOutputType = {
    id: number | null
    beehiveId: number | null
    amount: Decimal | null
  }

  export type ProductionHoneyMinAggregateOutputType = {
    id: number | null
    beehiveId: number | null
    dateCollection: Date | null
    amount: Decimal | null
    quality: string | null
    observations: string | null
  }

  export type ProductionHoneyMaxAggregateOutputType = {
    id: number | null
    beehiveId: number | null
    dateCollection: Date | null
    amount: Decimal | null
    quality: string | null
    observations: string | null
  }

  export type ProductionHoneyCountAggregateOutputType = {
    id: number
    beehiveId: number
    dateCollection: number
    amount: number
    quality: number
    observations: number
    _all: number
  }


  export type ProductionHoneyAvgAggregateInputType = {
    id?: true
    beehiveId?: true
    amount?: true
  }

  export type ProductionHoneySumAggregateInputType = {
    id?: true
    beehiveId?: true
    amount?: true
  }

  export type ProductionHoneyMinAggregateInputType = {
    id?: true
    beehiveId?: true
    dateCollection?: true
    amount?: true
    quality?: true
    observations?: true
  }

  export type ProductionHoneyMaxAggregateInputType = {
    id?: true
    beehiveId?: true
    dateCollection?: true
    amount?: true
    quality?: true
    observations?: true
  }

  export type ProductionHoneyCountAggregateInputType = {
    id?: true
    beehiveId?: true
    dateCollection?: true
    amount?: true
    quality?: true
    observations?: true
    _all?: true
  }

  export type ProductionHoneyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductionHoney to aggregate.
     */
    where?: ProductionHoneyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductionHoneys to fetch.
     */
    orderBy?: ProductionHoneyOrderByWithRelationInput | ProductionHoneyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductionHoneyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductionHoneys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductionHoneys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductionHoneys
    **/
    _count?: true | ProductionHoneyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductionHoneyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductionHoneySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductionHoneyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductionHoneyMaxAggregateInputType
  }

  export type GetProductionHoneyAggregateType<T extends ProductionHoneyAggregateArgs> = {
        [P in keyof T & keyof AggregateProductionHoney]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductionHoney[P]>
      : GetScalarType<T[P], AggregateProductionHoney[P]>
  }




  export type ProductionHoneyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductionHoneyWhereInput
    orderBy?: ProductionHoneyOrderByWithAggregationInput | ProductionHoneyOrderByWithAggregationInput[]
    by: ProductionHoneyScalarFieldEnum[] | ProductionHoneyScalarFieldEnum
    having?: ProductionHoneyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductionHoneyCountAggregateInputType | true
    _avg?: ProductionHoneyAvgAggregateInputType
    _sum?: ProductionHoneySumAggregateInputType
    _min?: ProductionHoneyMinAggregateInputType
    _max?: ProductionHoneyMaxAggregateInputType
  }

  export type ProductionHoneyGroupByOutputType = {
    id: number
    beehiveId: number
    dateCollection: Date
    amount: Decimal
    quality: string
    observations: string | null
    _count: ProductionHoneyCountAggregateOutputType | null
    _avg: ProductionHoneyAvgAggregateOutputType | null
    _sum: ProductionHoneySumAggregateOutputType | null
    _min: ProductionHoneyMinAggregateOutputType | null
    _max: ProductionHoneyMaxAggregateOutputType | null
  }

  type GetProductionHoneyGroupByPayload<T extends ProductionHoneyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductionHoneyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductionHoneyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductionHoneyGroupByOutputType[P]>
            : GetScalarType<T[P], ProductionHoneyGroupByOutputType[P]>
        }
      >
    >


  export type ProductionHoneySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    beehiveId?: boolean
    dateCollection?: boolean
    amount?: boolean
    quality?: boolean
    observations?: boolean
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productionHoney"]>

  export type ProductionHoneySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    beehiveId?: boolean
    dateCollection?: boolean
    amount?: boolean
    quality?: boolean
    observations?: boolean
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productionHoney"]>

  export type ProductionHoneySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    beehiveId?: boolean
    dateCollection?: boolean
    amount?: boolean
    quality?: boolean
    observations?: boolean
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productionHoney"]>

  export type ProductionHoneySelectScalar = {
    id?: boolean
    beehiveId?: boolean
    dateCollection?: boolean
    amount?: boolean
    quality?: boolean
    observations?: boolean
  }

  export type ProductionHoneyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "beehiveId" | "dateCollection" | "amount" | "quality" | "observations", ExtArgs["result"]["productionHoney"]>
  export type ProductionHoneyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }
  export type ProductionHoneyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }
  export type ProductionHoneyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }

  export type $ProductionHoneyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductionHoney"
    objects: {
      beehive: Prisma.$BeehivePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      beehiveId: number
      dateCollection: Date
      amount: Prisma.Decimal
      quality: string
      observations: string | null
    }, ExtArgs["result"]["productionHoney"]>
    composites: {}
  }

  type ProductionHoneyGetPayload<S extends boolean | null | undefined | ProductionHoneyDefaultArgs> = $Result.GetResult<Prisma.$ProductionHoneyPayload, S>

  type ProductionHoneyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductionHoneyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductionHoneyCountAggregateInputType | true
    }

  export interface ProductionHoneyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductionHoney'], meta: { name: 'ProductionHoney' } }
    /**
     * Find zero or one ProductionHoney that matches the filter.
     * @param {ProductionHoneyFindUniqueArgs} args - Arguments to find a ProductionHoney
     * @example
     * // Get one ProductionHoney
     * const productionHoney = await prisma.productionHoney.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductionHoneyFindUniqueArgs>(args: SelectSubset<T, ProductionHoneyFindUniqueArgs<ExtArgs>>): Prisma__ProductionHoneyClient<$Result.GetResult<Prisma.$ProductionHoneyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductionHoney that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductionHoneyFindUniqueOrThrowArgs} args - Arguments to find a ProductionHoney
     * @example
     * // Get one ProductionHoney
     * const productionHoney = await prisma.productionHoney.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductionHoneyFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductionHoneyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductionHoneyClient<$Result.GetResult<Prisma.$ProductionHoneyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductionHoney that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionHoneyFindFirstArgs} args - Arguments to find a ProductionHoney
     * @example
     * // Get one ProductionHoney
     * const productionHoney = await prisma.productionHoney.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductionHoneyFindFirstArgs>(args?: SelectSubset<T, ProductionHoneyFindFirstArgs<ExtArgs>>): Prisma__ProductionHoneyClient<$Result.GetResult<Prisma.$ProductionHoneyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductionHoney that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionHoneyFindFirstOrThrowArgs} args - Arguments to find a ProductionHoney
     * @example
     * // Get one ProductionHoney
     * const productionHoney = await prisma.productionHoney.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductionHoneyFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductionHoneyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductionHoneyClient<$Result.GetResult<Prisma.$ProductionHoneyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductionHoneys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionHoneyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductionHoneys
     * const productionHoneys = await prisma.productionHoney.findMany()
     * 
     * // Get first 10 ProductionHoneys
     * const productionHoneys = await prisma.productionHoney.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productionHoneyWithIdOnly = await prisma.productionHoney.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductionHoneyFindManyArgs>(args?: SelectSubset<T, ProductionHoneyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductionHoneyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductionHoney.
     * @param {ProductionHoneyCreateArgs} args - Arguments to create a ProductionHoney.
     * @example
     * // Create one ProductionHoney
     * const ProductionHoney = await prisma.productionHoney.create({
     *   data: {
     *     // ... data to create a ProductionHoney
     *   }
     * })
     * 
     */
    create<T extends ProductionHoneyCreateArgs>(args: SelectSubset<T, ProductionHoneyCreateArgs<ExtArgs>>): Prisma__ProductionHoneyClient<$Result.GetResult<Prisma.$ProductionHoneyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductionHoneys.
     * @param {ProductionHoneyCreateManyArgs} args - Arguments to create many ProductionHoneys.
     * @example
     * // Create many ProductionHoneys
     * const productionHoney = await prisma.productionHoney.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductionHoneyCreateManyArgs>(args?: SelectSubset<T, ProductionHoneyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductionHoneys and returns the data saved in the database.
     * @param {ProductionHoneyCreateManyAndReturnArgs} args - Arguments to create many ProductionHoneys.
     * @example
     * // Create many ProductionHoneys
     * const productionHoney = await prisma.productionHoney.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductionHoneys and only return the `id`
     * const productionHoneyWithIdOnly = await prisma.productionHoney.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductionHoneyCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductionHoneyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductionHoneyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductionHoney.
     * @param {ProductionHoneyDeleteArgs} args - Arguments to delete one ProductionHoney.
     * @example
     * // Delete one ProductionHoney
     * const ProductionHoney = await prisma.productionHoney.delete({
     *   where: {
     *     // ... filter to delete one ProductionHoney
     *   }
     * })
     * 
     */
    delete<T extends ProductionHoneyDeleteArgs>(args: SelectSubset<T, ProductionHoneyDeleteArgs<ExtArgs>>): Prisma__ProductionHoneyClient<$Result.GetResult<Prisma.$ProductionHoneyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductionHoney.
     * @param {ProductionHoneyUpdateArgs} args - Arguments to update one ProductionHoney.
     * @example
     * // Update one ProductionHoney
     * const productionHoney = await prisma.productionHoney.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductionHoneyUpdateArgs>(args: SelectSubset<T, ProductionHoneyUpdateArgs<ExtArgs>>): Prisma__ProductionHoneyClient<$Result.GetResult<Prisma.$ProductionHoneyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductionHoneys.
     * @param {ProductionHoneyDeleteManyArgs} args - Arguments to filter ProductionHoneys to delete.
     * @example
     * // Delete a few ProductionHoneys
     * const { count } = await prisma.productionHoney.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductionHoneyDeleteManyArgs>(args?: SelectSubset<T, ProductionHoneyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductionHoneys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionHoneyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductionHoneys
     * const productionHoney = await prisma.productionHoney.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductionHoneyUpdateManyArgs>(args: SelectSubset<T, ProductionHoneyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductionHoneys and returns the data updated in the database.
     * @param {ProductionHoneyUpdateManyAndReturnArgs} args - Arguments to update many ProductionHoneys.
     * @example
     * // Update many ProductionHoneys
     * const productionHoney = await prisma.productionHoney.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductionHoneys and only return the `id`
     * const productionHoneyWithIdOnly = await prisma.productionHoney.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductionHoneyUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductionHoneyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductionHoneyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductionHoney.
     * @param {ProductionHoneyUpsertArgs} args - Arguments to update or create a ProductionHoney.
     * @example
     * // Update or create a ProductionHoney
     * const productionHoney = await prisma.productionHoney.upsert({
     *   create: {
     *     // ... data to create a ProductionHoney
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductionHoney we want to update
     *   }
     * })
     */
    upsert<T extends ProductionHoneyUpsertArgs>(args: SelectSubset<T, ProductionHoneyUpsertArgs<ExtArgs>>): Prisma__ProductionHoneyClient<$Result.GetResult<Prisma.$ProductionHoneyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductionHoneys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionHoneyCountArgs} args - Arguments to filter ProductionHoneys to count.
     * @example
     * // Count the number of ProductionHoneys
     * const count = await prisma.productionHoney.count({
     *   where: {
     *     // ... the filter for the ProductionHoneys we want to count
     *   }
     * })
    **/
    count<T extends ProductionHoneyCountArgs>(
      args?: Subset<T, ProductionHoneyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductionHoneyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductionHoney.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionHoneyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductionHoneyAggregateArgs>(args: Subset<T, ProductionHoneyAggregateArgs>): Prisma.PrismaPromise<GetProductionHoneyAggregateType<T>>

    /**
     * Group by ProductionHoney.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductionHoneyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductionHoneyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductionHoneyGroupByArgs['orderBy'] }
        : { orderBy?: ProductionHoneyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductionHoneyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductionHoneyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductionHoney model
   */
  readonly fields: ProductionHoneyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductionHoney.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductionHoneyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    beehive<T extends BeehiveDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BeehiveDefaultArgs<ExtArgs>>): Prisma__BeehiveClient<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductionHoney model
   */
  interface ProductionHoneyFieldRefs {
    readonly id: FieldRef<"ProductionHoney", 'Int'>
    readonly beehiveId: FieldRef<"ProductionHoney", 'Int'>
    readonly dateCollection: FieldRef<"ProductionHoney", 'DateTime'>
    readonly amount: FieldRef<"ProductionHoney", 'Decimal'>
    readonly quality: FieldRef<"ProductionHoney", 'String'>
    readonly observations: FieldRef<"ProductionHoney", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProductionHoney findUnique
   */
  export type ProductionHoneyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionHoney
     */
    select?: ProductionHoneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionHoney
     */
    omit?: ProductionHoneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionHoneyInclude<ExtArgs> | null
    /**
     * Filter, which ProductionHoney to fetch.
     */
    where: ProductionHoneyWhereUniqueInput
  }

  /**
   * ProductionHoney findUniqueOrThrow
   */
  export type ProductionHoneyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionHoney
     */
    select?: ProductionHoneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionHoney
     */
    omit?: ProductionHoneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionHoneyInclude<ExtArgs> | null
    /**
     * Filter, which ProductionHoney to fetch.
     */
    where: ProductionHoneyWhereUniqueInput
  }

  /**
   * ProductionHoney findFirst
   */
  export type ProductionHoneyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionHoney
     */
    select?: ProductionHoneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionHoney
     */
    omit?: ProductionHoneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionHoneyInclude<ExtArgs> | null
    /**
     * Filter, which ProductionHoney to fetch.
     */
    where?: ProductionHoneyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductionHoneys to fetch.
     */
    orderBy?: ProductionHoneyOrderByWithRelationInput | ProductionHoneyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductionHoneys.
     */
    cursor?: ProductionHoneyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductionHoneys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductionHoneys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductionHoneys.
     */
    distinct?: ProductionHoneyScalarFieldEnum | ProductionHoneyScalarFieldEnum[]
  }

  /**
   * ProductionHoney findFirstOrThrow
   */
  export type ProductionHoneyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionHoney
     */
    select?: ProductionHoneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionHoney
     */
    omit?: ProductionHoneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionHoneyInclude<ExtArgs> | null
    /**
     * Filter, which ProductionHoney to fetch.
     */
    where?: ProductionHoneyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductionHoneys to fetch.
     */
    orderBy?: ProductionHoneyOrderByWithRelationInput | ProductionHoneyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductionHoneys.
     */
    cursor?: ProductionHoneyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductionHoneys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductionHoneys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductionHoneys.
     */
    distinct?: ProductionHoneyScalarFieldEnum | ProductionHoneyScalarFieldEnum[]
  }

  /**
   * ProductionHoney findMany
   */
  export type ProductionHoneyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionHoney
     */
    select?: ProductionHoneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionHoney
     */
    omit?: ProductionHoneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionHoneyInclude<ExtArgs> | null
    /**
     * Filter, which ProductionHoneys to fetch.
     */
    where?: ProductionHoneyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductionHoneys to fetch.
     */
    orderBy?: ProductionHoneyOrderByWithRelationInput | ProductionHoneyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductionHoneys.
     */
    cursor?: ProductionHoneyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductionHoneys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductionHoneys.
     */
    skip?: number
    distinct?: ProductionHoneyScalarFieldEnum | ProductionHoneyScalarFieldEnum[]
  }

  /**
   * ProductionHoney create
   */
  export type ProductionHoneyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionHoney
     */
    select?: ProductionHoneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionHoney
     */
    omit?: ProductionHoneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionHoneyInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductionHoney.
     */
    data: XOR<ProductionHoneyCreateInput, ProductionHoneyUncheckedCreateInput>
  }

  /**
   * ProductionHoney createMany
   */
  export type ProductionHoneyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductionHoneys.
     */
    data: ProductionHoneyCreateManyInput | ProductionHoneyCreateManyInput[]
  }

  /**
   * ProductionHoney createManyAndReturn
   */
  export type ProductionHoneyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionHoney
     */
    select?: ProductionHoneySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionHoney
     */
    omit?: ProductionHoneyOmit<ExtArgs> | null
    /**
     * The data used to create many ProductionHoneys.
     */
    data: ProductionHoneyCreateManyInput | ProductionHoneyCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionHoneyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductionHoney update
   */
  export type ProductionHoneyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionHoney
     */
    select?: ProductionHoneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionHoney
     */
    omit?: ProductionHoneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionHoneyInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductionHoney.
     */
    data: XOR<ProductionHoneyUpdateInput, ProductionHoneyUncheckedUpdateInput>
    /**
     * Choose, which ProductionHoney to update.
     */
    where: ProductionHoneyWhereUniqueInput
  }

  /**
   * ProductionHoney updateMany
   */
  export type ProductionHoneyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductionHoneys.
     */
    data: XOR<ProductionHoneyUpdateManyMutationInput, ProductionHoneyUncheckedUpdateManyInput>
    /**
     * Filter which ProductionHoneys to update
     */
    where?: ProductionHoneyWhereInput
    /**
     * Limit how many ProductionHoneys to update.
     */
    limit?: number
  }

  /**
   * ProductionHoney updateManyAndReturn
   */
  export type ProductionHoneyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionHoney
     */
    select?: ProductionHoneySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionHoney
     */
    omit?: ProductionHoneyOmit<ExtArgs> | null
    /**
     * The data used to update ProductionHoneys.
     */
    data: XOR<ProductionHoneyUpdateManyMutationInput, ProductionHoneyUncheckedUpdateManyInput>
    /**
     * Filter which ProductionHoneys to update
     */
    where?: ProductionHoneyWhereInput
    /**
     * Limit how many ProductionHoneys to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionHoneyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductionHoney upsert
   */
  export type ProductionHoneyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionHoney
     */
    select?: ProductionHoneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionHoney
     */
    omit?: ProductionHoneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionHoneyInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductionHoney to update in case it exists.
     */
    where: ProductionHoneyWhereUniqueInput
    /**
     * In case the ProductionHoney found by the `where` argument doesn't exist, create a new ProductionHoney with this data.
     */
    create: XOR<ProductionHoneyCreateInput, ProductionHoneyUncheckedCreateInput>
    /**
     * In case the ProductionHoney was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductionHoneyUpdateInput, ProductionHoneyUncheckedUpdateInput>
  }

  /**
   * ProductionHoney delete
   */
  export type ProductionHoneyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionHoney
     */
    select?: ProductionHoneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionHoney
     */
    omit?: ProductionHoneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionHoneyInclude<ExtArgs> | null
    /**
     * Filter which ProductionHoney to delete.
     */
    where: ProductionHoneyWhereUniqueInput
  }

  /**
   * ProductionHoney deleteMany
   */
  export type ProductionHoneyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductionHoneys to delete
     */
    where?: ProductionHoneyWhereInput
    /**
     * Limit how many ProductionHoneys to delete.
     */
    limit?: number
  }

  /**
   * ProductionHoney without action
   */
  export type ProductionHoneyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductionHoney
     */
    select?: ProductionHoneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductionHoney
     */
    omit?: ProductionHoneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductionHoneyInclude<ExtArgs> | null
  }


  /**
   * Model TemperaturesHumidity
   */

  export type AggregateTemperaturesHumidity = {
    _count: TemperaturesHumidityCountAggregateOutputType | null
    _avg: TemperaturesHumidityAvgAggregateOutputType | null
    _sum: TemperaturesHumiditySumAggregateOutputType | null
    _min: TemperaturesHumidityMinAggregateOutputType | null
    _max: TemperaturesHumidityMaxAggregateOutputType | null
  }

  export type TemperaturesHumidityAvgAggregateOutputType = {
    id: number | null
    beehiveId: number | null
    internalTemperature: Decimal | null
    externalTemperature: Decimal | null
    humidityInternal: Decimal | null
    humidityExternal: Decimal | null
  }

  export type TemperaturesHumiditySumAggregateOutputType = {
    id: number | null
    beehiveId: number | null
    internalTemperature: Decimal | null
    externalTemperature: Decimal | null
    humidityInternal: Decimal | null
    humidityExternal: Decimal | null
  }

  export type TemperaturesHumidityMinAggregateOutputType = {
    id: number | null
    beehiveId: number | null
    dateMeasurement: Date | null
    internalTemperature: Decimal | null
    externalTemperature: Decimal | null
    humidityInternal: Decimal | null
    humidityExternal: Decimal | null
  }

  export type TemperaturesHumidityMaxAggregateOutputType = {
    id: number | null
    beehiveId: number | null
    dateMeasurement: Date | null
    internalTemperature: Decimal | null
    externalTemperature: Decimal | null
    humidityInternal: Decimal | null
    humidityExternal: Decimal | null
  }

  export type TemperaturesHumidityCountAggregateOutputType = {
    id: number
    beehiveId: number
    dateMeasurement: number
    internalTemperature: number
    externalTemperature: number
    humidityInternal: number
    humidityExternal: number
    _all: number
  }


  export type TemperaturesHumidityAvgAggregateInputType = {
    id?: true
    beehiveId?: true
    internalTemperature?: true
    externalTemperature?: true
    humidityInternal?: true
    humidityExternal?: true
  }

  export type TemperaturesHumiditySumAggregateInputType = {
    id?: true
    beehiveId?: true
    internalTemperature?: true
    externalTemperature?: true
    humidityInternal?: true
    humidityExternal?: true
  }

  export type TemperaturesHumidityMinAggregateInputType = {
    id?: true
    beehiveId?: true
    dateMeasurement?: true
    internalTemperature?: true
    externalTemperature?: true
    humidityInternal?: true
    humidityExternal?: true
  }

  export type TemperaturesHumidityMaxAggregateInputType = {
    id?: true
    beehiveId?: true
    dateMeasurement?: true
    internalTemperature?: true
    externalTemperature?: true
    humidityInternal?: true
    humidityExternal?: true
  }

  export type TemperaturesHumidityCountAggregateInputType = {
    id?: true
    beehiveId?: true
    dateMeasurement?: true
    internalTemperature?: true
    externalTemperature?: true
    humidityInternal?: true
    humidityExternal?: true
    _all?: true
  }

  export type TemperaturesHumidityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TemperaturesHumidity to aggregate.
     */
    where?: TemperaturesHumidityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemperaturesHumidities to fetch.
     */
    orderBy?: TemperaturesHumidityOrderByWithRelationInput | TemperaturesHumidityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TemperaturesHumidityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemperaturesHumidities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemperaturesHumidities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TemperaturesHumidities
    **/
    _count?: true | TemperaturesHumidityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TemperaturesHumidityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TemperaturesHumiditySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemperaturesHumidityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemperaturesHumidityMaxAggregateInputType
  }

  export type GetTemperaturesHumidityAggregateType<T extends TemperaturesHumidityAggregateArgs> = {
        [P in keyof T & keyof AggregateTemperaturesHumidity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemperaturesHumidity[P]>
      : GetScalarType<T[P], AggregateTemperaturesHumidity[P]>
  }




  export type TemperaturesHumidityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemperaturesHumidityWhereInput
    orderBy?: TemperaturesHumidityOrderByWithAggregationInput | TemperaturesHumidityOrderByWithAggregationInput[]
    by: TemperaturesHumidityScalarFieldEnum[] | TemperaturesHumidityScalarFieldEnum
    having?: TemperaturesHumidityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemperaturesHumidityCountAggregateInputType | true
    _avg?: TemperaturesHumidityAvgAggregateInputType
    _sum?: TemperaturesHumiditySumAggregateInputType
    _min?: TemperaturesHumidityMinAggregateInputType
    _max?: TemperaturesHumidityMaxAggregateInputType
  }

  export type TemperaturesHumidityGroupByOutputType = {
    id: number
    beehiveId: number
    dateMeasurement: Date
    internalTemperature: Decimal
    externalTemperature: Decimal
    humidityInternal: Decimal
    humidityExternal: Decimal
    _count: TemperaturesHumidityCountAggregateOutputType | null
    _avg: TemperaturesHumidityAvgAggregateOutputType | null
    _sum: TemperaturesHumiditySumAggregateOutputType | null
    _min: TemperaturesHumidityMinAggregateOutputType | null
    _max: TemperaturesHumidityMaxAggregateOutputType | null
  }

  type GetTemperaturesHumidityGroupByPayload<T extends TemperaturesHumidityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TemperaturesHumidityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemperaturesHumidityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemperaturesHumidityGroupByOutputType[P]>
            : GetScalarType<T[P], TemperaturesHumidityGroupByOutputType[P]>
        }
      >
    >


  export type TemperaturesHumiditySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    beehiveId?: boolean
    dateMeasurement?: boolean
    internalTemperature?: boolean
    externalTemperature?: boolean
    humidityInternal?: boolean
    humidityExternal?: boolean
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["temperaturesHumidity"]>

  export type TemperaturesHumiditySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    beehiveId?: boolean
    dateMeasurement?: boolean
    internalTemperature?: boolean
    externalTemperature?: boolean
    humidityInternal?: boolean
    humidityExternal?: boolean
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["temperaturesHumidity"]>

  export type TemperaturesHumiditySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    beehiveId?: boolean
    dateMeasurement?: boolean
    internalTemperature?: boolean
    externalTemperature?: boolean
    humidityInternal?: boolean
    humidityExternal?: boolean
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["temperaturesHumidity"]>

  export type TemperaturesHumiditySelectScalar = {
    id?: boolean
    beehiveId?: boolean
    dateMeasurement?: boolean
    internalTemperature?: boolean
    externalTemperature?: boolean
    humidityInternal?: boolean
    humidityExternal?: boolean
  }

  export type TemperaturesHumidityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "beehiveId" | "dateMeasurement" | "internalTemperature" | "externalTemperature" | "humidityInternal" | "humidityExternal", ExtArgs["result"]["temperaturesHumidity"]>
  export type TemperaturesHumidityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }
  export type TemperaturesHumidityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }
  export type TemperaturesHumidityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }

  export type $TemperaturesHumidityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TemperaturesHumidity"
    objects: {
      beehive: Prisma.$BeehivePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      beehiveId: number
      dateMeasurement: Date
      internalTemperature: Prisma.Decimal
      externalTemperature: Prisma.Decimal
      humidityInternal: Prisma.Decimal
      humidityExternal: Prisma.Decimal
    }, ExtArgs["result"]["temperaturesHumidity"]>
    composites: {}
  }

  type TemperaturesHumidityGetPayload<S extends boolean | null | undefined | TemperaturesHumidityDefaultArgs> = $Result.GetResult<Prisma.$TemperaturesHumidityPayload, S>

  type TemperaturesHumidityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TemperaturesHumidityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TemperaturesHumidityCountAggregateInputType | true
    }

  export interface TemperaturesHumidityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TemperaturesHumidity'], meta: { name: 'TemperaturesHumidity' } }
    /**
     * Find zero or one TemperaturesHumidity that matches the filter.
     * @param {TemperaturesHumidityFindUniqueArgs} args - Arguments to find a TemperaturesHumidity
     * @example
     * // Get one TemperaturesHumidity
     * const temperaturesHumidity = await prisma.temperaturesHumidity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TemperaturesHumidityFindUniqueArgs>(args: SelectSubset<T, TemperaturesHumidityFindUniqueArgs<ExtArgs>>): Prisma__TemperaturesHumidityClient<$Result.GetResult<Prisma.$TemperaturesHumidityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TemperaturesHumidity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TemperaturesHumidityFindUniqueOrThrowArgs} args - Arguments to find a TemperaturesHumidity
     * @example
     * // Get one TemperaturesHumidity
     * const temperaturesHumidity = await prisma.temperaturesHumidity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TemperaturesHumidityFindUniqueOrThrowArgs>(args: SelectSubset<T, TemperaturesHumidityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TemperaturesHumidityClient<$Result.GetResult<Prisma.$TemperaturesHumidityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TemperaturesHumidity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemperaturesHumidityFindFirstArgs} args - Arguments to find a TemperaturesHumidity
     * @example
     * // Get one TemperaturesHumidity
     * const temperaturesHumidity = await prisma.temperaturesHumidity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TemperaturesHumidityFindFirstArgs>(args?: SelectSubset<T, TemperaturesHumidityFindFirstArgs<ExtArgs>>): Prisma__TemperaturesHumidityClient<$Result.GetResult<Prisma.$TemperaturesHumidityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TemperaturesHumidity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemperaturesHumidityFindFirstOrThrowArgs} args - Arguments to find a TemperaturesHumidity
     * @example
     * // Get one TemperaturesHumidity
     * const temperaturesHumidity = await prisma.temperaturesHumidity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TemperaturesHumidityFindFirstOrThrowArgs>(args?: SelectSubset<T, TemperaturesHumidityFindFirstOrThrowArgs<ExtArgs>>): Prisma__TemperaturesHumidityClient<$Result.GetResult<Prisma.$TemperaturesHumidityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TemperaturesHumidities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemperaturesHumidityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TemperaturesHumidities
     * const temperaturesHumidities = await prisma.temperaturesHumidity.findMany()
     * 
     * // Get first 10 TemperaturesHumidities
     * const temperaturesHumidities = await prisma.temperaturesHumidity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const temperaturesHumidityWithIdOnly = await prisma.temperaturesHumidity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TemperaturesHumidityFindManyArgs>(args?: SelectSubset<T, TemperaturesHumidityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemperaturesHumidityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TemperaturesHumidity.
     * @param {TemperaturesHumidityCreateArgs} args - Arguments to create a TemperaturesHumidity.
     * @example
     * // Create one TemperaturesHumidity
     * const TemperaturesHumidity = await prisma.temperaturesHumidity.create({
     *   data: {
     *     // ... data to create a TemperaturesHumidity
     *   }
     * })
     * 
     */
    create<T extends TemperaturesHumidityCreateArgs>(args: SelectSubset<T, TemperaturesHumidityCreateArgs<ExtArgs>>): Prisma__TemperaturesHumidityClient<$Result.GetResult<Prisma.$TemperaturesHumidityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TemperaturesHumidities.
     * @param {TemperaturesHumidityCreateManyArgs} args - Arguments to create many TemperaturesHumidities.
     * @example
     * // Create many TemperaturesHumidities
     * const temperaturesHumidity = await prisma.temperaturesHumidity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TemperaturesHumidityCreateManyArgs>(args?: SelectSubset<T, TemperaturesHumidityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TemperaturesHumidities and returns the data saved in the database.
     * @param {TemperaturesHumidityCreateManyAndReturnArgs} args - Arguments to create many TemperaturesHumidities.
     * @example
     * // Create many TemperaturesHumidities
     * const temperaturesHumidity = await prisma.temperaturesHumidity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TemperaturesHumidities and only return the `id`
     * const temperaturesHumidityWithIdOnly = await prisma.temperaturesHumidity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TemperaturesHumidityCreateManyAndReturnArgs>(args?: SelectSubset<T, TemperaturesHumidityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemperaturesHumidityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TemperaturesHumidity.
     * @param {TemperaturesHumidityDeleteArgs} args - Arguments to delete one TemperaturesHumidity.
     * @example
     * // Delete one TemperaturesHumidity
     * const TemperaturesHumidity = await prisma.temperaturesHumidity.delete({
     *   where: {
     *     // ... filter to delete one TemperaturesHumidity
     *   }
     * })
     * 
     */
    delete<T extends TemperaturesHumidityDeleteArgs>(args: SelectSubset<T, TemperaturesHumidityDeleteArgs<ExtArgs>>): Prisma__TemperaturesHumidityClient<$Result.GetResult<Prisma.$TemperaturesHumidityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TemperaturesHumidity.
     * @param {TemperaturesHumidityUpdateArgs} args - Arguments to update one TemperaturesHumidity.
     * @example
     * // Update one TemperaturesHumidity
     * const temperaturesHumidity = await prisma.temperaturesHumidity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TemperaturesHumidityUpdateArgs>(args: SelectSubset<T, TemperaturesHumidityUpdateArgs<ExtArgs>>): Prisma__TemperaturesHumidityClient<$Result.GetResult<Prisma.$TemperaturesHumidityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TemperaturesHumidities.
     * @param {TemperaturesHumidityDeleteManyArgs} args - Arguments to filter TemperaturesHumidities to delete.
     * @example
     * // Delete a few TemperaturesHumidities
     * const { count } = await prisma.temperaturesHumidity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TemperaturesHumidityDeleteManyArgs>(args?: SelectSubset<T, TemperaturesHumidityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TemperaturesHumidities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemperaturesHumidityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TemperaturesHumidities
     * const temperaturesHumidity = await prisma.temperaturesHumidity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TemperaturesHumidityUpdateManyArgs>(args: SelectSubset<T, TemperaturesHumidityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TemperaturesHumidities and returns the data updated in the database.
     * @param {TemperaturesHumidityUpdateManyAndReturnArgs} args - Arguments to update many TemperaturesHumidities.
     * @example
     * // Update many TemperaturesHumidities
     * const temperaturesHumidity = await prisma.temperaturesHumidity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TemperaturesHumidities and only return the `id`
     * const temperaturesHumidityWithIdOnly = await prisma.temperaturesHumidity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TemperaturesHumidityUpdateManyAndReturnArgs>(args: SelectSubset<T, TemperaturesHumidityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemperaturesHumidityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TemperaturesHumidity.
     * @param {TemperaturesHumidityUpsertArgs} args - Arguments to update or create a TemperaturesHumidity.
     * @example
     * // Update or create a TemperaturesHumidity
     * const temperaturesHumidity = await prisma.temperaturesHumidity.upsert({
     *   create: {
     *     // ... data to create a TemperaturesHumidity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TemperaturesHumidity we want to update
     *   }
     * })
     */
    upsert<T extends TemperaturesHumidityUpsertArgs>(args: SelectSubset<T, TemperaturesHumidityUpsertArgs<ExtArgs>>): Prisma__TemperaturesHumidityClient<$Result.GetResult<Prisma.$TemperaturesHumidityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TemperaturesHumidities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemperaturesHumidityCountArgs} args - Arguments to filter TemperaturesHumidities to count.
     * @example
     * // Count the number of TemperaturesHumidities
     * const count = await prisma.temperaturesHumidity.count({
     *   where: {
     *     // ... the filter for the TemperaturesHumidities we want to count
     *   }
     * })
    **/
    count<T extends TemperaturesHumidityCountArgs>(
      args?: Subset<T, TemperaturesHumidityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemperaturesHumidityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TemperaturesHumidity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemperaturesHumidityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TemperaturesHumidityAggregateArgs>(args: Subset<T, TemperaturesHumidityAggregateArgs>): Prisma.PrismaPromise<GetTemperaturesHumidityAggregateType<T>>

    /**
     * Group by TemperaturesHumidity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemperaturesHumidityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TemperaturesHumidityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TemperaturesHumidityGroupByArgs['orderBy'] }
        : { orderBy?: TemperaturesHumidityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TemperaturesHumidityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemperaturesHumidityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TemperaturesHumidity model
   */
  readonly fields: TemperaturesHumidityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TemperaturesHumidity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TemperaturesHumidityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    beehive<T extends BeehiveDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BeehiveDefaultArgs<ExtArgs>>): Prisma__BeehiveClient<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TemperaturesHumidity model
   */
  interface TemperaturesHumidityFieldRefs {
    readonly id: FieldRef<"TemperaturesHumidity", 'Int'>
    readonly beehiveId: FieldRef<"TemperaturesHumidity", 'Int'>
    readonly dateMeasurement: FieldRef<"TemperaturesHumidity", 'DateTime'>
    readonly internalTemperature: FieldRef<"TemperaturesHumidity", 'Decimal'>
    readonly externalTemperature: FieldRef<"TemperaturesHumidity", 'Decimal'>
    readonly humidityInternal: FieldRef<"TemperaturesHumidity", 'Decimal'>
    readonly humidityExternal: FieldRef<"TemperaturesHumidity", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * TemperaturesHumidity findUnique
   */
  export type TemperaturesHumidityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemperaturesHumidity
     */
    select?: TemperaturesHumiditySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemperaturesHumidity
     */
    omit?: TemperaturesHumidityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemperaturesHumidityInclude<ExtArgs> | null
    /**
     * Filter, which TemperaturesHumidity to fetch.
     */
    where: TemperaturesHumidityWhereUniqueInput
  }

  /**
   * TemperaturesHumidity findUniqueOrThrow
   */
  export type TemperaturesHumidityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemperaturesHumidity
     */
    select?: TemperaturesHumiditySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemperaturesHumidity
     */
    omit?: TemperaturesHumidityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemperaturesHumidityInclude<ExtArgs> | null
    /**
     * Filter, which TemperaturesHumidity to fetch.
     */
    where: TemperaturesHumidityWhereUniqueInput
  }

  /**
   * TemperaturesHumidity findFirst
   */
  export type TemperaturesHumidityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemperaturesHumidity
     */
    select?: TemperaturesHumiditySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemperaturesHumidity
     */
    omit?: TemperaturesHumidityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemperaturesHumidityInclude<ExtArgs> | null
    /**
     * Filter, which TemperaturesHumidity to fetch.
     */
    where?: TemperaturesHumidityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemperaturesHumidities to fetch.
     */
    orderBy?: TemperaturesHumidityOrderByWithRelationInput | TemperaturesHumidityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TemperaturesHumidities.
     */
    cursor?: TemperaturesHumidityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemperaturesHumidities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemperaturesHumidities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemperaturesHumidities.
     */
    distinct?: TemperaturesHumidityScalarFieldEnum | TemperaturesHumidityScalarFieldEnum[]
  }

  /**
   * TemperaturesHumidity findFirstOrThrow
   */
  export type TemperaturesHumidityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemperaturesHumidity
     */
    select?: TemperaturesHumiditySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemperaturesHumidity
     */
    omit?: TemperaturesHumidityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemperaturesHumidityInclude<ExtArgs> | null
    /**
     * Filter, which TemperaturesHumidity to fetch.
     */
    where?: TemperaturesHumidityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemperaturesHumidities to fetch.
     */
    orderBy?: TemperaturesHumidityOrderByWithRelationInput | TemperaturesHumidityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TemperaturesHumidities.
     */
    cursor?: TemperaturesHumidityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemperaturesHumidities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemperaturesHumidities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemperaturesHumidities.
     */
    distinct?: TemperaturesHumidityScalarFieldEnum | TemperaturesHumidityScalarFieldEnum[]
  }

  /**
   * TemperaturesHumidity findMany
   */
  export type TemperaturesHumidityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemperaturesHumidity
     */
    select?: TemperaturesHumiditySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemperaturesHumidity
     */
    omit?: TemperaturesHumidityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemperaturesHumidityInclude<ExtArgs> | null
    /**
     * Filter, which TemperaturesHumidities to fetch.
     */
    where?: TemperaturesHumidityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemperaturesHumidities to fetch.
     */
    orderBy?: TemperaturesHumidityOrderByWithRelationInput | TemperaturesHumidityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TemperaturesHumidities.
     */
    cursor?: TemperaturesHumidityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemperaturesHumidities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemperaturesHumidities.
     */
    skip?: number
    distinct?: TemperaturesHumidityScalarFieldEnum | TemperaturesHumidityScalarFieldEnum[]
  }

  /**
   * TemperaturesHumidity create
   */
  export type TemperaturesHumidityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemperaturesHumidity
     */
    select?: TemperaturesHumiditySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemperaturesHumidity
     */
    omit?: TemperaturesHumidityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemperaturesHumidityInclude<ExtArgs> | null
    /**
     * The data needed to create a TemperaturesHumidity.
     */
    data: XOR<TemperaturesHumidityCreateInput, TemperaturesHumidityUncheckedCreateInput>
  }

  /**
   * TemperaturesHumidity createMany
   */
  export type TemperaturesHumidityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TemperaturesHumidities.
     */
    data: TemperaturesHumidityCreateManyInput | TemperaturesHumidityCreateManyInput[]
  }

  /**
   * TemperaturesHumidity createManyAndReturn
   */
  export type TemperaturesHumidityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemperaturesHumidity
     */
    select?: TemperaturesHumiditySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TemperaturesHumidity
     */
    omit?: TemperaturesHumidityOmit<ExtArgs> | null
    /**
     * The data used to create many TemperaturesHumidities.
     */
    data: TemperaturesHumidityCreateManyInput | TemperaturesHumidityCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemperaturesHumidityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TemperaturesHumidity update
   */
  export type TemperaturesHumidityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemperaturesHumidity
     */
    select?: TemperaturesHumiditySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemperaturesHumidity
     */
    omit?: TemperaturesHumidityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemperaturesHumidityInclude<ExtArgs> | null
    /**
     * The data needed to update a TemperaturesHumidity.
     */
    data: XOR<TemperaturesHumidityUpdateInput, TemperaturesHumidityUncheckedUpdateInput>
    /**
     * Choose, which TemperaturesHumidity to update.
     */
    where: TemperaturesHumidityWhereUniqueInput
  }

  /**
   * TemperaturesHumidity updateMany
   */
  export type TemperaturesHumidityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TemperaturesHumidities.
     */
    data: XOR<TemperaturesHumidityUpdateManyMutationInput, TemperaturesHumidityUncheckedUpdateManyInput>
    /**
     * Filter which TemperaturesHumidities to update
     */
    where?: TemperaturesHumidityWhereInput
    /**
     * Limit how many TemperaturesHumidities to update.
     */
    limit?: number
  }

  /**
   * TemperaturesHumidity updateManyAndReturn
   */
  export type TemperaturesHumidityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemperaturesHumidity
     */
    select?: TemperaturesHumiditySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TemperaturesHumidity
     */
    omit?: TemperaturesHumidityOmit<ExtArgs> | null
    /**
     * The data used to update TemperaturesHumidities.
     */
    data: XOR<TemperaturesHumidityUpdateManyMutationInput, TemperaturesHumidityUncheckedUpdateManyInput>
    /**
     * Filter which TemperaturesHumidities to update
     */
    where?: TemperaturesHumidityWhereInput
    /**
     * Limit how many TemperaturesHumidities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemperaturesHumidityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TemperaturesHumidity upsert
   */
  export type TemperaturesHumidityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemperaturesHumidity
     */
    select?: TemperaturesHumiditySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemperaturesHumidity
     */
    omit?: TemperaturesHumidityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemperaturesHumidityInclude<ExtArgs> | null
    /**
     * The filter to search for the TemperaturesHumidity to update in case it exists.
     */
    where: TemperaturesHumidityWhereUniqueInput
    /**
     * In case the TemperaturesHumidity found by the `where` argument doesn't exist, create a new TemperaturesHumidity with this data.
     */
    create: XOR<TemperaturesHumidityCreateInput, TemperaturesHumidityUncheckedCreateInput>
    /**
     * In case the TemperaturesHumidity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TemperaturesHumidityUpdateInput, TemperaturesHumidityUncheckedUpdateInput>
  }

  /**
   * TemperaturesHumidity delete
   */
  export type TemperaturesHumidityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemperaturesHumidity
     */
    select?: TemperaturesHumiditySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemperaturesHumidity
     */
    omit?: TemperaturesHumidityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemperaturesHumidityInclude<ExtArgs> | null
    /**
     * Filter which TemperaturesHumidity to delete.
     */
    where: TemperaturesHumidityWhereUniqueInput
  }

  /**
   * TemperaturesHumidity deleteMany
   */
  export type TemperaturesHumidityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TemperaturesHumidities to delete
     */
    where?: TemperaturesHumidityWhereInput
    /**
     * Limit how many TemperaturesHumidities to delete.
     */
    limit?: number
  }

  /**
   * TemperaturesHumidity without action
   */
  export type TemperaturesHumidityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemperaturesHumidity
     */
    select?: TemperaturesHumiditySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemperaturesHumidity
     */
    omit?: TemperaturesHumidityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemperaturesHumidityInclude<ExtArgs> | null
  }


  /**
   * Model Food
   */

  export type AggregateFood = {
    _count: FoodCountAggregateOutputType | null
    _avg: FoodAvgAggregateOutputType | null
    _sum: FoodSumAggregateOutputType | null
    _min: FoodMinAggregateOutputType | null
    _max: FoodMaxAggregateOutputType | null
  }

  export type FoodAvgAggregateOutputType = {
    id: number | null
    beehiveId: number | null
    amount: Decimal | null
  }

  export type FoodSumAggregateOutputType = {
    id: number | null
    beehiveId: number | null
    amount: Decimal | null
  }

  export type FoodMinAggregateOutputType = {
    id: number | null
    beehiveId: number | null
    dateFeeding: Date | null
    typeFood: string | null
    amount: Decimal | null
    observations: string | null
  }

  export type FoodMaxAggregateOutputType = {
    id: number | null
    beehiveId: number | null
    dateFeeding: Date | null
    typeFood: string | null
    amount: Decimal | null
    observations: string | null
  }

  export type FoodCountAggregateOutputType = {
    id: number
    beehiveId: number
    dateFeeding: number
    typeFood: number
    amount: number
    observations: number
    _all: number
  }


  export type FoodAvgAggregateInputType = {
    id?: true
    beehiveId?: true
    amount?: true
  }

  export type FoodSumAggregateInputType = {
    id?: true
    beehiveId?: true
    amount?: true
  }

  export type FoodMinAggregateInputType = {
    id?: true
    beehiveId?: true
    dateFeeding?: true
    typeFood?: true
    amount?: true
    observations?: true
  }

  export type FoodMaxAggregateInputType = {
    id?: true
    beehiveId?: true
    dateFeeding?: true
    typeFood?: true
    amount?: true
    observations?: true
  }

  export type FoodCountAggregateInputType = {
    id?: true
    beehiveId?: true
    dateFeeding?: true
    typeFood?: true
    amount?: true
    observations?: true
    _all?: true
  }

  export type FoodAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Food to aggregate.
     */
    where?: FoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foods to fetch.
     */
    orderBy?: FoodOrderByWithRelationInput | FoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Foods
    **/
    _count?: true | FoodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FoodAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FoodSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FoodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FoodMaxAggregateInputType
  }

  export type GetFoodAggregateType<T extends FoodAggregateArgs> = {
        [P in keyof T & keyof AggregateFood]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFood[P]>
      : GetScalarType<T[P], AggregateFood[P]>
  }




  export type FoodGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodWhereInput
    orderBy?: FoodOrderByWithAggregationInput | FoodOrderByWithAggregationInput[]
    by: FoodScalarFieldEnum[] | FoodScalarFieldEnum
    having?: FoodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FoodCountAggregateInputType | true
    _avg?: FoodAvgAggregateInputType
    _sum?: FoodSumAggregateInputType
    _min?: FoodMinAggregateInputType
    _max?: FoodMaxAggregateInputType
  }

  export type FoodGroupByOutputType = {
    id: number
    beehiveId: number
    dateFeeding: Date
    typeFood: string
    amount: Decimal
    observations: string | null
    _count: FoodCountAggregateOutputType | null
    _avg: FoodAvgAggregateOutputType | null
    _sum: FoodSumAggregateOutputType | null
    _min: FoodMinAggregateOutputType | null
    _max: FoodMaxAggregateOutputType | null
  }

  type GetFoodGroupByPayload<T extends FoodGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FoodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FoodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FoodGroupByOutputType[P]>
            : GetScalarType<T[P], FoodGroupByOutputType[P]>
        }
      >
    >


  export type FoodSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    beehiveId?: boolean
    dateFeeding?: boolean
    typeFood?: boolean
    amount?: boolean
    observations?: boolean
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["food"]>

  export type FoodSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    beehiveId?: boolean
    dateFeeding?: boolean
    typeFood?: boolean
    amount?: boolean
    observations?: boolean
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["food"]>

  export type FoodSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    beehiveId?: boolean
    dateFeeding?: boolean
    typeFood?: boolean
    amount?: boolean
    observations?: boolean
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["food"]>

  export type FoodSelectScalar = {
    id?: boolean
    beehiveId?: boolean
    dateFeeding?: boolean
    typeFood?: boolean
    amount?: boolean
    observations?: boolean
  }

  export type FoodOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "beehiveId" | "dateFeeding" | "typeFood" | "amount" | "observations", ExtArgs["result"]["food"]>
  export type FoodInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }
  export type FoodIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }
  export type FoodIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }

  export type $FoodPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Food"
    objects: {
      beehive: Prisma.$BeehivePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      beehiveId: number
      dateFeeding: Date
      typeFood: string
      amount: Prisma.Decimal
      observations: string | null
    }, ExtArgs["result"]["food"]>
    composites: {}
  }

  type FoodGetPayload<S extends boolean | null | undefined | FoodDefaultArgs> = $Result.GetResult<Prisma.$FoodPayload, S>

  type FoodCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FoodFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FoodCountAggregateInputType | true
    }

  export interface FoodDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Food'], meta: { name: 'Food' } }
    /**
     * Find zero or one Food that matches the filter.
     * @param {FoodFindUniqueArgs} args - Arguments to find a Food
     * @example
     * // Get one Food
     * const food = await prisma.food.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FoodFindUniqueArgs>(args: SelectSubset<T, FoodFindUniqueArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Food that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FoodFindUniqueOrThrowArgs} args - Arguments to find a Food
     * @example
     * // Get one Food
     * const food = await prisma.food.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FoodFindUniqueOrThrowArgs>(args: SelectSubset<T, FoodFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Food that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodFindFirstArgs} args - Arguments to find a Food
     * @example
     * // Get one Food
     * const food = await prisma.food.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FoodFindFirstArgs>(args?: SelectSubset<T, FoodFindFirstArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Food that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodFindFirstOrThrowArgs} args - Arguments to find a Food
     * @example
     * // Get one Food
     * const food = await prisma.food.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FoodFindFirstOrThrowArgs>(args?: SelectSubset<T, FoodFindFirstOrThrowArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Foods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Foods
     * const foods = await prisma.food.findMany()
     * 
     * // Get first 10 Foods
     * const foods = await prisma.food.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const foodWithIdOnly = await prisma.food.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FoodFindManyArgs>(args?: SelectSubset<T, FoodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Food.
     * @param {FoodCreateArgs} args - Arguments to create a Food.
     * @example
     * // Create one Food
     * const Food = await prisma.food.create({
     *   data: {
     *     // ... data to create a Food
     *   }
     * })
     * 
     */
    create<T extends FoodCreateArgs>(args: SelectSubset<T, FoodCreateArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Foods.
     * @param {FoodCreateManyArgs} args - Arguments to create many Foods.
     * @example
     * // Create many Foods
     * const food = await prisma.food.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FoodCreateManyArgs>(args?: SelectSubset<T, FoodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Foods and returns the data saved in the database.
     * @param {FoodCreateManyAndReturnArgs} args - Arguments to create many Foods.
     * @example
     * // Create many Foods
     * const food = await prisma.food.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Foods and only return the `id`
     * const foodWithIdOnly = await prisma.food.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FoodCreateManyAndReturnArgs>(args?: SelectSubset<T, FoodCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Food.
     * @param {FoodDeleteArgs} args - Arguments to delete one Food.
     * @example
     * // Delete one Food
     * const Food = await prisma.food.delete({
     *   where: {
     *     // ... filter to delete one Food
     *   }
     * })
     * 
     */
    delete<T extends FoodDeleteArgs>(args: SelectSubset<T, FoodDeleteArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Food.
     * @param {FoodUpdateArgs} args - Arguments to update one Food.
     * @example
     * // Update one Food
     * const food = await prisma.food.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FoodUpdateArgs>(args: SelectSubset<T, FoodUpdateArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Foods.
     * @param {FoodDeleteManyArgs} args - Arguments to filter Foods to delete.
     * @example
     * // Delete a few Foods
     * const { count } = await prisma.food.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FoodDeleteManyArgs>(args?: SelectSubset<T, FoodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Foods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Foods
     * const food = await prisma.food.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FoodUpdateManyArgs>(args: SelectSubset<T, FoodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Foods and returns the data updated in the database.
     * @param {FoodUpdateManyAndReturnArgs} args - Arguments to update many Foods.
     * @example
     * // Update many Foods
     * const food = await prisma.food.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Foods and only return the `id`
     * const foodWithIdOnly = await prisma.food.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FoodUpdateManyAndReturnArgs>(args: SelectSubset<T, FoodUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Food.
     * @param {FoodUpsertArgs} args - Arguments to update or create a Food.
     * @example
     * // Update or create a Food
     * const food = await prisma.food.upsert({
     *   create: {
     *     // ... data to create a Food
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Food we want to update
     *   }
     * })
     */
    upsert<T extends FoodUpsertArgs>(args: SelectSubset<T, FoodUpsertArgs<ExtArgs>>): Prisma__FoodClient<$Result.GetResult<Prisma.$FoodPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Foods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodCountArgs} args - Arguments to filter Foods to count.
     * @example
     * // Count the number of Foods
     * const count = await prisma.food.count({
     *   where: {
     *     // ... the filter for the Foods we want to count
     *   }
     * })
    **/
    count<T extends FoodCountArgs>(
      args?: Subset<T, FoodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FoodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Food.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FoodAggregateArgs>(args: Subset<T, FoodAggregateArgs>): Prisma.PrismaPromise<GetFoodAggregateType<T>>

    /**
     * Group by Food.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FoodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FoodGroupByArgs['orderBy'] }
        : { orderBy?: FoodGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FoodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFoodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Food model
   */
  readonly fields: FoodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Food.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FoodClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    beehive<T extends BeehiveDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BeehiveDefaultArgs<ExtArgs>>): Prisma__BeehiveClient<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Food model
   */
  interface FoodFieldRefs {
    readonly id: FieldRef<"Food", 'Int'>
    readonly beehiveId: FieldRef<"Food", 'Int'>
    readonly dateFeeding: FieldRef<"Food", 'DateTime'>
    readonly typeFood: FieldRef<"Food", 'String'>
    readonly amount: FieldRef<"Food", 'Decimal'>
    readonly observations: FieldRef<"Food", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Food findUnique
   */
  export type FoodFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter, which Food to fetch.
     */
    where: FoodWhereUniqueInput
  }

  /**
   * Food findUniqueOrThrow
   */
  export type FoodFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter, which Food to fetch.
     */
    where: FoodWhereUniqueInput
  }

  /**
   * Food findFirst
   */
  export type FoodFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter, which Food to fetch.
     */
    where?: FoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foods to fetch.
     */
    orderBy?: FoodOrderByWithRelationInput | FoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Foods.
     */
    cursor?: FoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Foods.
     */
    distinct?: FoodScalarFieldEnum | FoodScalarFieldEnum[]
  }

  /**
   * Food findFirstOrThrow
   */
  export type FoodFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter, which Food to fetch.
     */
    where?: FoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foods to fetch.
     */
    orderBy?: FoodOrderByWithRelationInput | FoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Foods.
     */
    cursor?: FoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Foods.
     */
    distinct?: FoodScalarFieldEnum | FoodScalarFieldEnum[]
  }

  /**
   * Food findMany
   */
  export type FoodFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter, which Foods to fetch.
     */
    where?: FoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foods to fetch.
     */
    orderBy?: FoodOrderByWithRelationInput | FoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Foods.
     */
    cursor?: FoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foods.
     */
    skip?: number
    distinct?: FoodScalarFieldEnum | FoodScalarFieldEnum[]
  }

  /**
   * Food create
   */
  export type FoodCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * The data needed to create a Food.
     */
    data: XOR<FoodCreateInput, FoodUncheckedCreateInput>
  }

  /**
   * Food createMany
   */
  export type FoodCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Foods.
     */
    data: FoodCreateManyInput | FoodCreateManyInput[]
  }

  /**
   * Food createManyAndReturn
   */
  export type FoodCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * The data used to create many Foods.
     */
    data: FoodCreateManyInput | FoodCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Food update
   */
  export type FoodUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * The data needed to update a Food.
     */
    data: XOR<FoodUpdateInput, FoodUncheckedUpdateInput>
    /**
     * Choose, which Food to update.
     */
    where: FoodWhereUniqueInput
  }

  /**
   * Food updateMany
   */
  export type FoodUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Foods.
     */
    data: XOR<FoodUpdateManyMutationInput, FoodUncheckedUpdateManyInput>
    /**
     * Filter which Foods to update
     */
    where?: FoodWhereInput
    /**
     * Limit how many Foods to update.
     */
    limit?: number
  }

  /**
   * Food updateManyAndReturn
   */
  export type FoodUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * The data used to update Foods.
     */
    data: XOR<FoodUpdateManyMutationInput, FoodUncheckedUpdateManyInput>
    /**
     * Filter which Foods to update
     */
    where?: FoodWhereInput
    /**
     * Limit how many Foods to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Food upsert
   */
  export type FoodUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * The filter to search for the Food to update in case it exists.
     */
    where: FoodWhereUniqueInput
    /**
     * In case the Food found by the `where` argument doesn't exist, create a new Food with this data.
     */
    create: XOR<FoodCreateInput, FoodUncheckedCreateInput>
    /**
     * In case the Food was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FoodUpdateInput, FoodUncheckedUpdateInput>
  }

  /**
   * Food delete
   */
  export type FoodDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
    /**
     * Filter which Food to delete.
     */
    where: FoodWhereUniqueInput
  }

  /**
   * Food deleteMany
   */
  export type FoodDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Foods to delete
     */
    where?: FoodWhereInput
    /**
     * Limit how many Foods to delete.
     */
    limit?: number
  }

  /**
   * Food without action
   */
  export type FoodDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Food
     */
    select?: FoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Food
     */
    omit?: FoodOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodInclude<ExtArgs> | null
  }


  /**
   * Model Disease
   */

  export type AggregateDisease = {
    _count: DiseaseCountAggregateOutputType | null
    _avg: DiseaseAvgAggregateOutputType | null
    _sum: DiseaseSumAggregateOutputType | null
    _min: DiseaseMinAggregateOutputType | null
    _max: DiseaseMaxAggregateOutputType | null
  }

  export type DiseaseAvgAggregateOutputType = {
    id: number | null
    beehiveId: number | null
  }

  export type DiseaseSumAggregateOutputType = {
    id: number | null
    beehiveId: number | null
  }

  export type DiseaseMinAggregateOutputType = {
    id: number | null
    beehiveId: number | null
    dateDiagnosis: Date | null
    diseasePrague: string | null
    treatment: string | null
    observations: string | null
  }

  export type DiseaseMaxAggregateOutputType = {
    id: number | null
    beehiveId: number | null
    dateDiagnosis: Date | null
    diseasePrague: string | null
    treatment: string | null
    observations: string | null
  }

  export type DiseaseCountAggregateOutputType = {
    id: number
    beehiveId: number
    dateDiagnosis: number
    diseasePrague: number
    treatment: number
    observations: number
    _all: number
  }


  export type DiseaseAvgAggregateInputType = {
    id?: true
    beehiveId?: true
  }

  export type DiseaseSumAggregateInputType = {
    id?: true
    beehiveId?: true
  }

  export type DiseaseMinAggregateInputType = {
    id?: true
    beehiveId?: true
    dateDiagnosis?: true
    diseasePrague?: true
    treatment?: true
    observations?: true
  }

  export type DiseaseMaxAggregateInputType = {
    id?: true
    beehiveId?: true
    dateDiagnosis?: true
    diseasePrague?: true
    treatment?: true
    observations?: true
  }

  export type DiseaseCountAggregateInputType = {
    id?: true
    beehiveId?: true
    dateDiagnosis?: true
    diseasePrague?: true
    treatment?: true
    observations?: true
    _all?: true
  }

  export type DiseaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Disease to aggregate.
     */
    where?: DiseaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Diseases to fetch.
     */
    orderBy?: DiseaseOrderByWithRelationInput | DiseaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DiseaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Diseases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Diseases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Diseases
    **/
    _count?: true | DiseaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DiseaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DiseaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DiseaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DiseaseMaxAggregateInputType
  }

  export type GetDiseaseAggregateType<T extends DiseaseAggregateArgs> = {
        [P in keyof T & keyof AggregateDisease]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDisease[P]>
      : GetScalarType<T[P], AggregateDisease[P]>
  }




  export type DiseaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiseaseWhereInput
    orderBy?: DiseaseOrderByWithAggregationInput | DiseaseOrderByWithAggregationInput[]
    by: DiseaseScalarFieldEnum[] | DiseaseScalarFieldEnum
    having?: DiseaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DiseaseCountAggregateInputType | true
    _avg?: DiseaseAvgAggregateInputType
    _sum?: DiseaseSumAggregateInputType
    _min?: DiseaseMinAggregateInputType
    _max?: DiseaseMaxAggregateInputType
  }

  export type DiseaseGroupByOutputType = {
    id: number
    beehiveId: number
    dateDiagnosis: Date
    diseasePrague: string
    treatment: string
    observations: string | null
    _count: DiseaseCountAggregateOutputType | null
    _avg: DiseaseAvgAggregateOutputType | null
    _sum: DiseaseSumAggregateOutputType | null
    _min: DiseaseMinAggregateOutputType | null
    _max: DiseaseMaxAggregateOutputType | null
  }

  type GetDiseaseGroupByPayload<T extends DiseaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DiseaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DiseaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DiseaseGroupByOutputType[P]>
            : GetScalarType<T[P], DiseaseGroupByOutputType[P]>
        }
      >
    >


  export type DiseaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    beehiveId?: boolean
    dateDiagnosis?: boolean
    diseasePrague?: boolean
    treatment?: boolean
    observations?: boolean
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["disease"]>

  export type DiseaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    beehiveId?: boolean
    dateDiagnosis?: boolean
    diseasePrague?: boolean
    treatment?: boolean
    observations?: boolean
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["disease"]>

  export type DiseaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    beehiveId?: boolean
    dateDiagnosis?: boolean
    diseasePrague?: boolean
    treatment?: boolean
    observations?: boolean
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["disease"]>

  export type DiseaseSelectScalar = {
    id?: boolean
    beehiveId?: boolean
    dateDiagnosis?: boolean
    diseasePrague?: boolean
    treatment?: boolean
    observations?: boolean
  }

  export type DiseaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "beehiveId" | "dateDiagnosis" | "diseasePrague" | "treatment" | "observations", ExtArgs["result"]["disease"]>
  export type DiseaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }
  export type DiseaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }
  export type DiseaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beehive?: boolean | BeehiveDefaultArgs<ExtArgs>
  }

  export type $DiseasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Disease"
    objects: {
      beehive: Prisma.$BeehivePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      beehiveId: number
      dateDiagnosis: Date
      diseasePrague: string
      treatment: string
      observations: string | null
    }, ExtArgs["result"]["disease"]>
    composites: {}
  }

  type DiseaseGetPayload<S extends boolean | null | undefined | DiseaseDefaultArgs> = $Result.GetResult<Prisma.$DiseasePayload, S>

  type DiseaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DiseaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DiseaseCountAggregateInputType | true
    }

  export interface DiseaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Disease'], meta: { name: 'Disease' } }
    /**
     * Find zero or one Disease that matches the filter.
     * @param {DiseaseFindUniqueArgs} args - Arguments to find a Disease
     * @example
     * // Get one Disease
     * const disease = await prisma.disease.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiseaseFindUniqueArgs>(args: SelectSubset<T, DiseaseFindUniqueArgs<ExtArgs>>): Prisma__DiseaseClient<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Disease that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DiseaseFindUniqueOrThrowArgs} args - Arguments to find a Disease
     * @example
     * // Get one Disease
     * const disease = await prisma.disease.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiseaseFindUniqueOrThrowArgs>(args: SelectSubset<T, DiseaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DiseaseClient<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Disease that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseFindFirstArgs} args - Arguments to find a Disease
     * @example
     * // Get one Disease
     * const disease = await prisma.disease.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiseaseFindFirstArgs>(args?: SelectSubset<T, DiseaseFindFirstArgs<ExtArgs>>): Prisma__DiseaseClient<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Disease that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseFindFirstOrThrowArgs} args - Arguments to find a Disease
     * @example
     * // Get one Disease
     * const disease = await prisma.disease.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiseaseFindFirstOrThrowArgs>(args?: SelectSubset<T, DiseaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__DiseaseClient<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Diseases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Diseases
     * const diseases = await prisma.disease.findMany()
     * 
     * // Get first 10 Diseases
     * const diseases = await prisma.disease.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const diseaseWithIdOnly = await prisma.disease.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DiseaseFindManyArgs>(args?: SelectSubset<T, DiseaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Disease.
     * @param {DiseaseCreateArgs} args - Arguments to create a Disease.
     * @example
     * // Create one Disease
     * const Disease = await prisma.disease.create({
     *   data: {
     *     // ... data to create a Disease
     *   }
     * })
     * 
     */
    create<T extends DiseaseCreateArgs>(args: SelectSubset<T, DiseaseCreateArgs<ExtArgs>>): Prisma__DiseaseClient<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Diseases.
     * @param {DiseaseCreateManyArgs} args - Arguments to create many Diseases.
     * @example
     * // Create many Diseases
     * const disease = await prisma.disease.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DiseaseCreateManyArgs>(args?: SelectSubset<T, DiseaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Diseases and returns the data saved in the database.
     * @param {DiseaseCreateManyAndReturnArgs} args - Arguments to create many Diseases.
     * @example
     * // Create many Diseases
     * const disease = await prisma.disease.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Diseases and only return the `id`
     * const diseaseWithIdOnly = await prisma.disease.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DiseaseCreateManyAndReturnArgs>(args?: SelectSubset<T, DiseaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Disease.
     * @param {DiseaseDeleteArgs} args - Arguments to delete one Disease.
     * @example
     * // Delete one Disease
     * const Disease = await prisma.disease.delete({
     *   where: {
     *     // ... filter to delete one Disease
     *   }
     * })
     * 
     */
    delete<T extends DiseaseDeleteArgs>(args: SelectSubset<T, DiseaseDeleteArgs<ExtArgs>>): Prisma__DiseaseClient<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Disease.
     * @param {DiseaseUpdateArgs} args - Arguments to update one Disease.
     * @example
     * // Update one Disease
     * const disease = await prisma.disease.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DiseaseUpdateArgs>(args: SelectSubset<T, DiseaseUpdateArgs<ExtArgs>>): Prisma__DiseaseClient<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Diseases.
     * @param {DiseaseDeleteManyArgs} args - Arguments to filter Diseases to delete.
     * @example
     * // Delete a few Diseases
     * const { count } = await prisma.disease.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DiseaseDeleteManyArgs>(args?: SelectSubset<T, DiseaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Diseases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Diseases
     * const disease = await prisma.disease.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DiseaseUpdateManyArgs>(args: SelectSubset<T, DiseaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Diseases and returns the data updated in the database.
     * @param {DiseaseUpdateManyAndReturnArgs} args - Arguments to update many Diseases.
     * @example
     * // Update many Diseases
     * const disease = await prisma.disease.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Diseases and only return the `id`
     * const diseaseWithIdOnly = await prisma.disease.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DiseaseUpdateManyAndReturnArgs>(args: SelectSubset<T, DiseaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Disease.
     * @param {DiseaseUpsertArgs} args - Arguments to update or create a Disease.
     * @example
     * // Update or create a Disease
     * const disease = await prisma.disease.upsert({
     *   create: {
     *     // ... data to create a Disease
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Disease we want to update
     *   }
     * })
     */
    upsert<T extends DiseaseUpsertArgs>(args: SelectSubset<T, DiseaseUpsertArgs<ExtArgs>>): Prisma__DiseaseClient<$Result.GetResult<Prisma.$DiseasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Diseases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseCountArgs} args - Arguments to filter Diseases to count.
     * @example
     * // Count the number of Diseases
     * const count = await prisma.disease.count({
     *   where: {
     *     // ... the filter for the Diseases we want to count
     *   }
     * })
    **/
    count<T extends DiseaseCountArgs>(
      args?: Subset<T, DiseaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DiseaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Disease.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DiseaseAggregateArgs>(args: Subset<T, DiseaseAggregateArgs>): Prisma.PrismaPromise<GetDiseaseAggregateType<T>>

    /**
     * Group by Disease.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiseaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DiseaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DiseaseGroupByArgs['orderBy'] }
        : { orderBy?: DiseaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DiseaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiseaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Disease model
   */
  readonly fields: DiseaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Disease.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DiseaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    beehive<T extends BeehiveDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BeehiveDefaultArgs<ExtArgs>>): Prisma__BeehiveClient<$Result.GetResult<Prisma.$BeehivePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Disease model
   */
  interface DiseaseFieldRefs {
    readonly id: FieldRef<"Disease", 'Int'>
    readonly beehiveId: FieldRef<"Disease", 'Int'>
    readonly dateDiagnosis: FieldRef<"Disease", 'DateTime'>
    readonly diseasePrague: FieldRef<"Disease", 'String'>
    readonly treatment: FieldRef<"Disease", 'String'>
    readonly observations: FieldRef<"Disease", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Disease findUnique
   */
  export type DiseaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * Filter, which Disease to fetch.
     */
    where: DiseaseWhereUniqueInput
  }

  /**
   * Disease findUniqueOrThrow
   */
  export type DiseaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * Filter, which Disease to fetch.
     */
    where: DiseaseWhereUniqueInput
  }

  /**
   * Disease findFirst
   */
  export type DiseaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * Filter, which Disease to fetch.
     */
    where?: DiseaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Diseases to fetch.
     */
    orderBy?: DiseaseOrderByWithRelationInput | DiseaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Diseases.
     */
    cursor?: DiseaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Diseases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Diseases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Diseases.
     */
    distinct?: DiseaseScalarFieldEnum | DiseaseScalarFieldEnum[]
  }

  /**
   * Disease findFirstOrThrow
   */
  export type DiseaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * Filter, which Disease to fetch.
     */
    where?: DiseaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Diseases to fetch.
     */
    orderBy?: DiseaseOrderByWithRelationInput | DiseaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Diseases.
     */
    cursor?: DiseaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Diseases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Diseases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Diseases.
     */
    distinct?: DiseaseScalarFieldEnum | DiseaseScalarFieldEnum[]
  }

  /**
   * Disease findMany
   */
  export type DiseaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * Filter, which Diseases to fetch.
     */
    where?: DiseaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Diseases to fetch.
     */
    orderBy?: DiseaseOrderByWithRelationInput | DiseaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Diseases.
     */
    cursor?: DiseaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Diseases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Diseases.
     */
    skip?: number
    distinct?: DiseaseScalarFieldEnum | DiseaseScalarFieldEnum[]
  }

  /**
   * Disease create
   */
  export type DiseaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * The data needed to create a Disease.
     */
    data: XOR<DiseaseCreateInput, DiseaseUncheckedCreateInput>
  }

  /**
   * Disease createMany
   */
  export type DiseaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Diseases.
     */
    data: DiseaseCreateManyInput | DiseaseCreateManyInput[]
  }

  /**
   * Disease createManyAndReturn
   */
  export type DiseaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * The data used to create many Diseases.
     */
    data: DiseaseCreateManyInput | DiseaseCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Disease update
   */
  export type DiseaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * The data needed to update a Disease.
     */
    data: XOR<DiseaseUpdateInput, DiseaseUncheckedUpdateInput>
    /**
     * Choose, which Disease to update.
     */
    where: DiseaseWhereUniqueInput
  }

  /**
   * Disease updateMany
   */
  export type DiseaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Diseases.
     */
    data: XOR<DiseaseUpdateManyMutationInput, DiseaseUncheckedUpdateManyInput>
    /**
     * Filter which Diseases to update
     */
    where?: DiseaseWhereInput
    /**
     * Limit how many Diseases to update.
     */
    limit?: number
  }

  /**
   * Disease updateManyAndReturn
   */
  export type DiseaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * The data used to update Diseases.
     */
    data: XOR<DiseaseUpdateManyMutationInput, DiseaseUncheckedUpdateManyInput>
    /**
     * Filter which Diseases to update
     */
    where?: DiseaseWhereInput
    /**
     * Limit how many Diseases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Disease upsert
   */
  export type DiseaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * The filter to search for the Disease to update in case it exists.
     */
    where: DiseaseWhereUniqueInput
    /**
     * In case the Disease found by the `where` argument doesn't exist, create a new Disease with this data.
     */
    create: XOR<DiseaseCreateInput, DiseaseUncheckedCreateInput>
    /**
     * In case the Disease was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DiseaseUpdateInput, DiseaseUncheckedUpdateInput>
  }

  /**
   * Disease delete
   */
  export type DiseaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
    /**
     * Filter which Disease to delete.
     */
    where: DiseaseWhereUniqueInput
  }

  /**
   * Disease deleteMany
   */
  export type DiseaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Diseases to delete
     */
    where?: DiseaseWhereInput
    /**
     * Limit how many Diseases to delete.
     */
    limit?: number
  }

  /**
   * Disease without action
   */
  export type DiseaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disease
     */
    select?: DiseaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disease
     */
    omit?: DiseaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiseaseInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProducerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    cpfCnpj: 'cpfCnpj',
    longitude: 'longitude',
    latitude: 'latitude',
    startDate: 'startDate',
    status: 'status'
  };

  export type ProducerScalarFieldEnum = (typeof ProducerScalarFieldEnum)[keyof typeof ProducerScalarFieldEnum]


  export const BeehiveScalarFieldEnum: {
    id: 'id',
    producerId: 'producerId',
    name: 'name',
    longitude: 'longitude',
    latitude: 'latitude',
    startDate: 'startDate',
    status: 'status',
    typeBeehive: 'typeBeehive',
    observations: 'observations'
  };

  export type BeehiveScalarFieldEnum = (typeof BeehiveScalarFieldEnum)[keyof typeof BeehiveScalarFieldEnum]


  export const ActivityScalarFieldEnum: {
    id: 'id',
    beehiveId: 'beehiveId',
    dateActivity: 'dateActivity',
    typeActivity: 'typeActivity',
    descriptions: 'descriptions',
    observations: 'observations'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const ProductionHoneyScalarFieldEnum: {
    id: 'id',
    beehiveId: 'beehiveId',
    dateCollection: 'dateCollection',
    amount: 'amount',
    quality: 'quality',
    observations: 'observations'
  };

  export type ProductionHoneyScalarFieldEnum = (typeof ProductionHoneyScalarFieldEnum)[keyof typeof ProductionHoneyScalarFieldEnum]


  export const TemperaturesHumidityScalarFieldEnum: {
    id: 'id',
    beehiveId: 'beehiveId',
    dateMeasurement: 'dateMeasurement',
    internalTemperature: 'internalTemperature',
    externalTemperature: 'externalTemperature',
    humidityInternal: 'humidityInternal',
    humidityExternal: 'humidityExternal'
  };

  export type TemperaturesHumidityScalarFieldEnum = (typeof TemperaturesHumidityScalarFieldEnum)[keyof typeof TemperaturesHumidityScalarFieldEnum]


  export const FoodScalarFieldEnum: {
    id: 'id',
    beehiveId: 'beehiveId',
    dateFeeding: 'dateFeeding',
    typeFood: 'typeFood',
    amount: 'amount',
    observations: 'observations'
  };

  export type FoodScalarFieldEnum = (typeof FoodScalarFieldEnum)[keyof typeof FoodScalarFieldEnum]


  export const DiseaseScalarFieldEnum: {
    id: 'id',
    beehiveId: 'beehiveId',
    dateDiagnosis: 'dateDiagnosis',
    diseasePrague: 'diseasePrague',
    treatment: 'treatment',
    observations: 'observations'
  };

  export type DiseaseScalarFieldEnum = (typeof DiseaseScalarFieldEnum)[keyof typeof DiseaseScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    
  /**
   * Deep Input Types
   */


  export type ProducerWhereInput = {
    AND?: ProducerWhereInput | ProducerWhereInput[]
    OR?: ProducerWhereInput[]
    NOT?: ProducerWhereInput | ProducerWhereInput[]
    id?: IntFilter<"Producer"> | number
    name?: StringFilter<"Producer"> | string
    email?: StringFilter<"Producer"> | string
    password?: StringFilter<"Producer"> | string
    cpfCnpj?: StringFilter<"Producer"> | string
    longitude?: FloatFilter<"Producer"> | number
    latitude?: FloatFilter<"Producer"> | number
    startDate?: DateTimeFilter<"Producer"> | Date | string
    status?: StringFilter<"Producer"> | string
    beehives?: BeehiveListRelationFilter
  }

  export type ProducerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    cpfCnpj?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    startDate?: SortOrder
    status?: SortOrder
    beehives?: BeehiveOrderByRelationAggregateInput
  }

  export type ProducerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    cpfCnpj?: string
    AND?: ProducerWhereInput | ProducerWhereInput[]
    OR?: ProducerWhereInput[]
    NOT?: ProducerWhereInput | ProducerWhereInput[]
    name?: StringFilter<"Producer"> | string
    password?: StringFilter<"Producer"> | string
    longitude?: FloatFilter<"Producer"> | number
    latitude?: FloatFilter<"Producer"> | number
    startDate?: DateTimeFilter<"Producer"> | Date | string
    status?: StringFilter<"Producer"> | string
    beehives?: BeehiveListRelationFilter
  }, "id" | "email" | "cpfCnpj">

  export type ProducerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    cpfCnpj?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    startDate?: SortOrder
    status?: SortOrder
    _count?: ProducerCountOrderByAggregateInput
    _avg?: ProducerAvgOrderByAggregateInput
    _max?: ProducerMaxOrderByAggregateInput
    _min?: ProducerMinOrderByAggregateInput
    _sum?: ProducerSumOrderByAggregateInput
  }

  export type ProducerScalarWhereWithAggregatesInput = {
    AND?: ProducerScalarWhereWithAggregatesInput | ProducerScalarWhereWithAggregatesInput[]
    OR?: ProducerScalarWhereWithAggregatesInput[]
    NOT?: ProducerScalarWhereWithAggregatesInput | ProducerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Producer"> | number
    name?: StringWithAggregatesFilter<"Producer"> | string
    email?: StringWithAggregatesFilter<"Producer"> | string
    password?: StringWithAggregatesFilter<"Producer"> | string
    cpfCnpj?: StringWithAggregatesFilter<"Producer"> | string
    longitude?: FloatWithAggregatesFilter<"Producer"> | number
    latitude?: FloatWithAggregatesFilter<"Producer"> | number
    startDate?: DateTimeWithAggregatesFilter<"Producer"> | Date | string
    status?: StringWithAggregatesFilter<"Producer"> | string
  }

  export type BeehiveWhereInput = {
    AND?: BeehiveWhereInput | BeehiveWhereInput[]
    OR?: BeehiveWhereInput[]
    NOT?: BeehiveWhereInput | BeehiveWhereInput[]
    id?: IntFilter<"Beehive"> | number
    producerId?: IntFilter<"Beehive"> | number
    name?: StringFilter<"Beehive"> | string
    longitude?: FloatFilter<"Beehive"> | number
    latitude?: FloatFilter<"Beehive"> | number
    startDate?: DateTimeFilter<"Beehive"> | Date | string
    status?: StringFilter<"Beehive"> | string
    typeBeehive?: StringFilter<"Beehive"> | string
    observations?: StringNullableFilter<"Beehive"> | string | null
    producer?: XOR<ProducerScalarRelationFilter, ProducerWhereInput>
    activities?: ActivityListRelationFilter
    productionsHoney?: ProductionHoneyListRelationFilter
    temperaturesHumidities?: TemperaturesHumidityListRelationFilter
    foods?: FoodListRelationFilter
    diseases?: DiseaseListRelationFilter
  }

  export type BeehiveOrderByWithRelationInput = {
    id?: SortOrder
    producerId?: SortOrder
    name?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    startDate?: SortOrder
    status?: SortOrder
    typeBeehive?: SortOrder
    observations?: SortOrderInput | SortOrder
    producer?: ProducerOrderByWithRelationInput
    activities?: ActivityOrderByRelationAggregateInput
    productionsHoney?: ProductionHoneyOrderByRelationAggregateInput
    temperaturesHumidities?: TemperaturesHumidityOrderByRelationAggregateInput
    foods?: FoodOrderByRelationAggregateInput
    diseases?: DiseaseOrderByRelationAggregateInput
  }

  export type BeehiveWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BeehiveWhereInput | BeehiveWhereInput[]
    OR?: BeehiveWhereInput[]
    NOT?: BeehiveWhereInput | BeehiveWhereInput[]
    producerId?: IntFilter<"Beehive"> | number
    name?: StringFilter<"Beehive"> | string
    longitude?: FloatFilter<"Beehive"> | number
    latitude?: FloatFilter<"Beehive"> | number
    startDate?: DateTimeFilter<"Beehive"> | Date | string
    status?: StringFilter<"Beehive"> | string
    typeBeehive?: StringFilter<"Beehive"> | string
    observations?: StringNullableFilter<"Beehive"> | string | null
    producer?: XOR<ProducerScalarRelationFilter, ProducerWhereInput>
    activities?: ActivityListRelationFilter
    productionsHoney?: ProductionHoneyListRelationFilter
    temperaturesHumidities?: TemperaturesHumidityListRelationFilter
    foods?: FoodListRelationFilter
    diseases?: DiseaseListRelationFilter
  }, "id">

  export type BeehiveOrderByWithAggregationInput = {
    id?: SortOrder
    producerId?: SortOrder
    name?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    startDate?: SortOrder
    status?: SortOrder
    typeBeehive?: SortOrder
    observations?: SortOrderInput | SortOrder
    _count?: BeehiveCountOrderByAggregateInput
    _avg?: BeehiveAvgOrderByAggregateInput
    _max?: BeehiveMaxOrderByAggregateInput
    _min?: BeehiveMinOrderByAggregateInput
    _sum?: BeehiveSumOrderByAggregateInput
  }

  export type BeehiveScalarWhereWithAggregatesInput = {
    AND?: BeehiveScalarWhereWithAggregatesInput | BeehiveScalarWhereWithAggregatesInput[]
    OR?: BeehiveScalarWhereWithAggregatesInput[]
    NOT?: BeehiveScalarWhereWithAggregatesInput | BeehiveScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Beehive"> | number
    producerId?: IntWithAggregatesFilter<"Beehive"> | number
    name?: StringWithAggregatesFilter<"Beehive"> | string
    longitude?: FloatWithAggregatesFilter<"Beehive"> | number
    latitude?: FloatWithAggregatesFilter<"Beehive"> | number
    startDate?: DateTimeWithAggregatesFilter<"Beehive"> | Date | string
    status?: StringWithAggregatesFilter<"Beehive"> | string
    typeBeehive?: StringWithAggregatesFilter<"Beehive"> | string
    observations?: StringNullableWithAggregatesFilter<"Beehive"> | string | null
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    id?: IntFilter<"Activity"> | number
    beehiveId?: IntFilter<"Activity"> | number
    dateActivity?: DateTimeFilter<"Activity"> | Date | string
    typeActivity?: StringFilter<"Activity"> | string
    descriptions?: StringFilter<"Activity"> | string
    observations?: StringNullableFilter<"Activity"> | string | null
    beehive?: XOR<BeehiveScalarRelationFilter, BeehiveWhereInput>
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateActivity?: SortOrder
    typeActivity?: SortOrder
    descriptions?: SortOrder
    observations?: SortOrderInput | SortOrder
    beehive?: BeehiveOrderByWithRelationInput
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    beehiveId?: IntFilter<"Activity"> | number
    dateActivity?: DateTimeFilter<"Activity"> | Date | string
    typeActivity?: StringFilter<"Activity"> | string
    descriptions?: StringFilter<"Activity"> | string
    observations?: StringNullableFilter<"Activity"> | string | null
    beehive?: XOR<BeehiveScalarRelationFilter, BeehiveWhereInput>
  }, "id">

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateActivity?: SortOrder
    typeActivity?: SortOrder
    descriptions?: SortOrder
    observations?: SortOrderInput | SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _avg?: ActivityAvgOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
    _sum?: ActivitySumOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Activity"> | number
    beehiveId?: IntWithAggregatesFilter<"Activity"> | number
    dateActivity?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
    typeActivity?: StringWithAggregatesFilter<"Activity"> | string
    descriptions?: StringWithAggregatesFilter<"Activity"> | string
    observations?: StringNullableWithAggregatesFilter<"Activity"> | string | null
  }

  export type ProductionHoneyWhereInput = {
    AND?: ProductionHoneyWhereInput | ProductionHoneyWhereInput[]
    OR?: ProductionHoneyWhereInput[]
    NOT?: ProductionHoneyWhereInput | ProductionHoneyWhereInput[]
    id?: IntFilter<"ProductionHoney"> | number
    beehiveId?: IntFilter<"ProductionHoney"> | number
    dateCollection?: DateTimeFilter<"ProductionHoney"> | Date | string
    amount?: DecimalFilter<"ProductionHoney"> | Decimal | DecimalJsLike | number | string
    quality?: StringFilter<"ProductionHoney"> | string
    observations?: StringNullableFilter<"ProductionHoney"> | string | null
    beehive?: XOR<BeehiveScalarRelationFilter, BeehiveWhereInput>
  }

  export type ProductionHoneyOrderByWithRelationInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateCollection?: SortOrder
    amount?: SortOrder
    quality?: SortOrder
    observations?: SortOrderInput | SortOrder
    beehive?: BeehiveOrderByWithRelationInput
  }

  export type ProductionHoneyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductionHoneyWhereInput | ProductionHoneyWhereInput[]
    OR?: ProductionHoneyWhereInput[]
    NOT?: ProductionHoneyWhereInput | ProductionHoneyWhereInput[]
    beehiveId?: IntFilter<"ProductionHoney"> | number
    dateCollection?: DateTimeFilter<"ProductionHoney"> | Date | string
    amount?: DecimalFilter<"ProductionHoney"> | Decimal | DecimalJsLike | number | string
    quality?: StringFilter<"ProductionHoney"> | string
    observations?: StringNullableFilter<"ProductionHoney"> | string | null
    beehive?: XOR<BeehiveScalarRelationFilter, BeehiveWhereInput>
  }, "id">

  export type ProductionHoneyOrderByWithAggregationInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateCollection?: SortOrder
    amount?: SortOrder
    quality?: SortOrder
    observations?: SortOrderInput | SortOrder
    _count?: ProductionHoneyCountOrderByAggregateInput
    _avg?: ProductionHoneyAvgOrderByAggregateInput
    _max?: ProductionHoneyMaxOrderByAggregateInput
    _min?: ProductionHoneyMinOrderByAggregateInput
    _sum?: ProductionHoneySumOrderByAggregateInput
  }

  export type ProductionHoneyScalarWhereWithAggregatesInput = {
    AND?: ProductionHoneyScalarWhereWithAggregatesInput | ProductionHoneyScalarWhereWithAggregatesInput[]
    OR?: ProductionHoneyScalarWhereWithAggregatesInput[]
    NOT?: ProductionHoneyScalarWhereWithAggregatesInput | ProductionHoneyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductionHoney"> | number
    beehiveId?: IntWithAggregatesFilter<"ProductionHoney"> | number
    dateCollection?: DateTimeWithAggregatesFilter<"ProductionHoney"> | Date | string
    amount?: DecimalWithAggregatesFilter<"ProductionHoney"> | Decimal | DecimalJsLike | number | string
    quality?: StringWithAggregatesFilter<"ProductionHoney"> | string
    observations?: StringNullableWithAggregatesFilter<"ProductionHoney"> | string | null
  }

  export type TemperaturesHumidityWhereInput = {
    AND?: TemperaturesHumidityWhereInput | TemperaturesHumidityWhereInput[]
    OR?: TemperaturesHumidityWhereInput[]
    NOT?: TemperaturesHumidityWhereInput | TemperaturesHumidityWhereInput[]
    id?: IntFilter<"TemperaturesHumidity"> | number
    beehiveId?: IntFilter<"TemperaturesHumidity"> | number
    dateMeasurement?: DateTimeFilter<"TemperaturesHumidity"> | Date | string
    internalTemperature?: DecimalFilter<"TemperaturesHumidity"> | Decimal | DecimalJsLike | number | string
    externalTemperature?: DecimalFilter<"TemperaturesHumidity"> | Decimal | DecimalJsLike | number | string
    humidityInternal?: DecimalFilter<"TemperaturesHumidity"> | Decimal | DecimalJsLike | number | string
    humidityExternal?: DecimalFilter<"TemperaturesHumidity"> | Decimal | DecimalJsLike | number | string
    beehive?: XOR<BeehiveScalarRelationFilter, BeehiveWhereInput>
  }

  export type TemperaturesHumidityOrderByWithRelationInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateMeasurement?: SortOrder
    internalTemperature?: SortOrder
    externalTemperature?: SortOrder
    humidityInternal?: SortOrder
    humidityExternal?: SortOrder
    beehive?: BeehiveOrderByWithRelationInput
  }

  export type TemperaturesHumidityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TemperaturesHumidityWhereInput | TemperaturesHumidityWhereInput[]
    OR?: TemperaturesHumidityWhereInput[]
    NOT?: TemperaturesHumidityWhereInput | TemperaturesHumidityWhereInput[]
    beehiveId?: IntFilter<"TemperaturesHumidity"> | number
    dateMeasurement?: DateTimeFilter<"TemperaturesHumidity"> | Date | string
    internalTemperature?: DecimalFilter<"TemperaturesHumidity"> | Decimal | DecimalJsLike | number | string
    externalTemperature?: DecimalFilter<"TemperaturesHumidity"> | Decimal | DecimalJsLike | number | string
    humidityInternal?: DecimalFilter<"TemperaturesHumidity"> | Decimal | DecimalJsLike | number | string
    humidityExternal?: DecimalFilter<"TemperaturesHumidity"> | Decimal | DecimalJsLike | number | string
    beehive?: XOR<BeehiveScalarRelationFilter, BeehiveWhereInput>
  }, "id">

  export type TemperaturesHumidityOrderByWithAggregationInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateMeasurement?: SortOrder
    internalTemperature?: SortOrder
    externalTemperature?: SortOrder
    humidityInternal?: SortOrder
    humidityExternal?: SortOrder
    _count?: TemperaturesHumidityCountOrderByAggregateInput
    _avg?: TemperaturesHumidityAvgOrderByAggregateInput
    _max?: TemperaturesHumidityMaxOrderByAggregateInput
    _min?: TemperaturesHumidityMinOrderByAggregateInput
    _sum?: TemperaturesHumiditySumOrderByAggregateInput
  }

  export type TemperaturesHumidityScalarWhereWithAggregatesInput = {
    AND?: TemperaturesHumidityScalarWhereWithAggregatesInput | TemperaturesHumidityScalarWhereWithAggregatesInput[]
    OR?: TemperaturesHumidityScalarWhereWithAggregatesInput[]
    NOT?: TemperaturesHumidityScalarWhereWithAggregatesInput | TemperaturesHumidityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TemperaturesHumidity"> | number
    beehiveId?: IntWithAggregatesFilter<"TemperaturesHumidity"> | number
    dateMeasurement?: DateTimeWithAggregatesFilter<"TemperaturesHumidity"> | Date | string
    internalTemperature?: DecimalWithAggregatesFilter<"TemperaturesHumidity"> | Decimal | DecimalJsLike | number | string
    externalTemperature?: DecimalWithAggregatesFilter<"TemperaturesHumidity"> | Decimal | DecimalJsLike | number | string
    humidityInternal?: DecimalWithAggregatesFilter<"TemperaturesHumidity"> | Decimal | DecimalJsLike | number | string
    humidityExternal?: DecimalWithAggregatesFilter<"TemperaturesHumidity"> | Decimal | DecimalJsLike | number | string
  }

  export type FoodWhereInput = {
    AND?: FoodWhereInput | FoodWhereInput[]
    OR?: FoodWhereInput[]
    NOT?: FoodWhereInput | FoodWhereInput[]
    id?: IntFilter<"Food"> | number
    beehiveId?: IntFilter<"Food"> | number
    dateFeeding?: DateTimeFilter<"Food"> | Date | string
    typeFood?: StringFilter<"Food"> | string
    amount?: DecimalFilter<"Food"> | Decimal | DecimalJsLike | number | string
    observations?: StringNullableFilter<"Food"> | string | null
    beehive?: XOR<BeehiveScalarRelationFilter, BeehiveWhereInput>
  }

  export type FoodOrderByWithRelationInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateFeeding?: SortOrder
    typeFood?: SortOrder
    amount?: SortOrder
    observations?: SortOrderInput | SortOrder
    beehive?: BeehiveOrderByWithRelationInput
  }

  export type FoodWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FoodWhereInput | FoodWhereInput[]
    OR?: FoodWhereInput[]
    NOT?: FoodWhereInput | FoodWhereInput[]
    beehiveId?: IntFilter<"Food"> | number
    dateFeeding?: DateTimeFilter<"Food"> | Date | string
    typeFood?: StringFilter<"Food"> | string
    amount?: DecimalFilter<"Food"> | Decimal | DecimalJsLike | number | string
    observations?: StringNullableFilter<"Food"> | string | null
    beehive?: XOR<BeehiveScalarRelationFilter, BeehiveWhereInput>
  }, "id">

  export type FoodOrderByWithAggregationInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateFeeding?: SortOrder
    typeFood?: SortOrder
    amount?: SortOrder
    observations?: SortOrderInput | SortOrder
    _count?: FoodCountOrderByAggregateInput
    _avg?: FoodAvgOrderByAggregateInput
    _max?: FoodMaxOrderByAggregateInput
    _min?: FoodMinOrderByAggregateInput
    _sum?: FoodSumOrderByAggregateInput
  }

  export type FoodScalarWhereWithAggregatesInput = {
    AND?: FoodScalarWhereWithAggregatesInput | FoodScalarWhereWithAggregatesInput[]
    OR?: FoodScalarWhereWithAggregatesInput[]
    NOT?: FoodScalarWhereWithAggregatesInput | FoodScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Food"> | number
    beehiveId?: IntWithAggregatesFilter<"Food"> | number
    dateFeeding?: DateTimeWithAggregatesFilter<"Food"> | Date | string
    typeFood?: StringWithAggregatesFilter<"Food"> | string
    amount?: DecimalWithAggregatesFilter<"Food"> | Decimal | DecimalJsLike | number | string
    observations?: StringNullableWithAggregatesFilter<"Food"> | string | null
  }

  export type DiseaseWhereInput = {
    AND?: DiseaseWhereInput | DiseaseWhereInput[]
    OR?: DiseaseWhereInput[]
    NOT?: DiseaseWhereInput | DiseaseWhereInput[]
    id?: IntFilter<"Disease"> | number
    beehiveId?: IntFilter<"Disease"> | number
    dateDiagnosis?: DateTimeFilter<"Disease"> | Date | string
    diseasePrague?: StringFilter<"Disease"> | string
    treatment?: StringFilter<"Disease"> | string
    observations?: StringNullableFilter<"Disease"> | string | null
    beehive?: XOR<BeehiveScalarRelationFilter, BeehiveWhereInput>
  }

  export type DiseaseOrderByWithRelationInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateDiagnosis?: SortOrder
    diseasePrague?: SortOrder
    treatment?: SortOrder
    observations?: SortOrderInput | SortOrder
    beehive?: BeehiveOrderByWithRelationInput
  }

  export type DiseaseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DiseaseWhereInput | DiseaseWhereInput[]
    OR?: DiseaseWhereInput[]
    NOT?: DiseaseWhereInput | DiseaseWhereInput[]
    beehiveId?: IntFilter<"Disease"> | number
    dateDiagnosis?: DateTimeFilter<"Disease"> | Date | string
    diseasePrague?: StringFilter<"Disease"> | string
    treatment?: StringFilter<"Disease"> | string
    observations?: StringNullableFilter<"Disease"> | string | null
    beehive?: XOR<BeehiveScalarRelationFilter, BeehiveWhereInput>
  }, "id">

  export type DiseaseOrderByWithAggregationInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateDiagnosis?: SortOrder
    diseasePrague?: SortOrder
    treatment?: SortOrder
    observations?: SortOrderInput | SortOrder
    _count?: DiseaseCountOrderByAggregateInput
    _avg?: DiseaseAvgOrderByAggregateInput
    _max?: DiseaseMaxOrderByAggregateInput
    _min?: DiseaseMinOrderByAggregateInput
    _sum?: DiseaseSumOrderByAggregateInput
  }

  export type DiseaseScalarWhereWithAggregatesInput = {
    AND?: DiseaseScalarWhereWithAggregatesInput | DiseaseScalarWhereWithAggregatesInput[]
    OR?: DiseaseScalarWhereWithAggregatesInput[]
    NOT?: DiseaseScalarWhereWithAggregatesInput | DiseaseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Disease"> | number
    beehiveId?: IntWithAggregatesFilter<"Disease"> | number
    dateDiagnosis?: DateTimeWithAggregatesFilter<"Disease"> | Date | string
    diseasePrague?: StringWithAggregatesFilter<"Disease"> | string
    treatment?: StringWithAggregatesFilter<"Disease"> | string
    observations?: StringNullableWithAggregatesFilter<"Disease"> | string | null
  }

  export type ProducerCreateInput = {
    name: string
    email: string
    password: string
    cpfCnpj: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    beehives?: BeehiveCreateNestedManyWithoutProducerInput
  }

  export type ProducerUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
    cpfCnpj: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    beehives?: BeehiveUncheckedCreateNestedManyWithoutProducerInput
  }

  export type ProducerUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    beehives?: BeehiveUpdateManyWithoutProducerNestedInput
  }

  export type ProducerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    beehives?: BeehiveUncheckedUpdateManyWithoutProducerNestedInput
  }

  export type ProducerCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
    cpfCnpj: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
  }

  export type ProducerUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ProducerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type BeehiveCreateInput = {
    name: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    typeBeehive: string
    observations?: string | null
    producer: ProducerCreateNestedOneWithoutBeehivesInput
    activities?: ActivityCreateNestedManyWithoutBeehiveInput
    productionsHoney?: ProductionHoneyCreateNestedManyWithoutBeehiveInput
    temperaturesHumidities?: TemperaturesHumidityCreateNestedManyWithoutBeehiveInput
    foods?: FoodCreateNestedManyWithoutBeehiveInput
    diseases?: DiseaseCreateNestedManyWithoutBeehiveInput
  }

  export type BeehiveUncheckedCreateInput = {
    id?: number
    producerId: number
    name: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    typeBeehive: string
    observations?: string | null
    activities?: ActivityUncheckedCreateNestedManyWithoutBeehiveInput
    productionsHoney?: ProductionHoneyUncheckedCreateNestedManyWithoutBeehiveInput
    temperaturesHumidities?: TemperaturesHumidityUncheckedCreateNestedManyWithoutBeehiveInput
    foods?: FoodUncheckedCreateNestedManyWithoutBeehiveInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutBeehiveInput
  }

  export type BeehiveUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    producer?: ProducerUpdateOneRequiredWithoutBeehivesNestedInput
    activities?: ActivityUpdateManyWithoutBeehiveNestedInput
    productionsHoney?: ProductionHoneyUpdateManyWithoutBeehiveNestedInput
    temperaturesHumidities?: TemperaturesHumidityUpdateManyWithoutBeehiveNestedInput
    foods?: FoodUpdateManyWithoutBeehiveNestedInput
    diseases?: DiseaseUpdateManyWithoutBeehiveNestedInput
  }

  export type BeehiveUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    producerId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: ActivityUncheckedUpdateManyWithoutBeehiveNestedInput
    productionsHoney?: ProductionHoneyUncheckedUpdateManyWithoutBeehiveNestedInput
    temperaturesHumidities?: TemperaturesHumidityUncheckedUpdateManyWithoutBeehiveNestedInput
    foods?: FoodUncheckedUpdateManyWithoutBeehiveNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutBeehiveNestedInput
  }

  export type BeehiveCreateManyInput = {
    id?: number
    producerId: number
    name: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    typeBeehive: string
    observations?: string | null
  }

  export type BeehiveUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BeehiveUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    producerId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityCreateInput = {
    dateActivity: Date | string
    typeActivity: string
    descriptions: string
    observations?: string | null
    beehive: BeehiveCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateInput = {
    id?: number
    beehiveId: number
    dateActivity: Date | string
    typeActivity: string
    descriptions: string
    observations?: string | null
  }

  export type ActivityUpdateInput = {
    dateActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    typeActivity?: StringFieldUpdateOperationsInput | string
    descriptions?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    beehive?: BeehiveUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    beehiveId?: IntFieldUpdateOperationsInput | number
    dateActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    typeActivity?: StringFieldUpdateOperationsInput | string
    descriptions?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityCreateManyInput = {
    id?: number
    beehiveId: number
    dateActivity: Date | string
    typeActivity: string
    descriptions: string
    observations?: string | null
  }

  export type ActivityUpdateManyMutationInput = {
    dateActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    typeActivity?: StringFieldUpdateOperationsInput | string
    descriptions?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    beehiveId?: IntFieldUpdateOperationsInput | number
    dateActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    typeActivity?: StringFieldUpdateOperationsInput | string
    descriptions?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductionHoneyCreateInput = {
    dateCollection: Date | string
    amount: Decimal | DecimalJsLike | number | string
    quality: string
    observations?: string | null
    beehive: BeehiveCreateNestedOneWithoutProductionsHoneyInput
  }

  export type ProductionHoneyUncheckedCreateInput = {
    id?: number
    beehiveId: number
    dateCollection: Date | string
    amount: Decimal | DecimalJsLike | number | string
    quality: string
    observations?: string | null
  }

  export type ProductionHoneyUpdateInput = {
    dateCollection?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quality?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    beehive?: BeehiveUpdateOneRequiredWithoutProductionsHoneyNestedInput
  }

  export type ProductionHoneyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    beehiveId?: IntFieldUpdateOperationsInput | number
    dateCollection?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quality?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductionHoneyCreateManyInput = {
    id?: number
    beehiveId: number
    dateCollection: Date | string
    amount: Decimal | DecimalJsLike | number | string
    quality: string
    observations?: string | null
  }

  export type ProductionHoneyUpdateManyMutationInput = {
    dateCollection?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quality?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductionHoneyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    beehiveId?: IntFieldUpdateOperationsInput | number
    dateCollection?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quality?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TemperaturesHumidityCreateInput = {
    dateMeasurement: Date | string
    internalTemperature: Decimal | DecimalJsLike | number | string
    externalTemperature: Decimal | DecimalJsLike | number | string
    humidityInternal: Decimal | DecimalJsLike | number | string
    humidityExternal: Decimal | DecimalJsLike | number | string
    beehive: BeehiveCreateNestedOneWithoutTemperaturesHumiditiesInput
  }

  export type TemperaturesHumidityUncheckedCreateInput = {
    id?: number
    beehiveId: number
    dateMeasurement: Date | string
    internalTemperature: Decimal | DecimalJsLike | number | string
    externalTemperature: Decimal | DecimalJsLike | number | string
    humidityInternal: Decimal | DecimalJsLike | number | string
    humidityExternal: Decimal | DecimalJsLike | number | string
  }

  export type TemperaturesHumidityUpdateInput = {
    dateMeasurement?: DateTimeFieldUpdateOperationsInput | Date | string
    internalTemperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    externalTemperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    humidityInternal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    humidityExternal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    beehive?: BeehiveUpdateOneRequiredWithoutTemperaturesHumiditiesNestedInput
  }

  export type TemperaturesHumidityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    beehiveId?: IntFieldUpdateOperationsInput | number
    dateMeasurement?: DateTimeFieldUpdateOperationsInput | Date | string
    internalTemperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    externalTemperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    humidityInternal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    humidityExternal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TemperaturesHumidityCreateManyInput = {
    id?: number
    beehiveId: number
    dateMeasurement: Date | string
    internalTemperature: Decimal | DecimalJsLike | number | string
    externalTemperature: Decimal | DecimalJsLike | number | string
    humidityInternal: Decimal | DecimalJsLike | number | string
    humidityExternal: Decimal | DecimalJsLike | number | string
  }

  export type TemperaturesHumidityUpdateManyMutationInput = {
    dateMeasurement?: DateTimeFieldUpdateOperationsInput | Date | string
    internalTemperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    externalTemperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    humidityInternal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    humidityExternal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TemperaturesHumidityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    beehiveId?: IntFieldUpdateOperationsInput | number
    dateMeasurement?: DateTimeFieldUpdateOperationsInput | Date | string
    internalTemperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    externalTemperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    humidityInternal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    humidityExternal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type FoodCreateInput = {
    dateFeeding: Date | string
    typeFood: string
    amount: Decimal | DecimalJsLike | number | string
    observations?: string | null
    beehive: BeehiveCreateNestedOneWithoutFoodsInput
  }

  export type FoodUncheckedCreateInput = {
    id?: number
    beehiveId: number
    dateFeeding: Date | string
    typeFood: string
    amount: Decimal | DecimalJsLike | number | string
    observations?: string | null
  }

  export type FoodUpdateInput = {
    dateFeeding?: DateTimeFieldUpdateOperationsInput | Date | string
    typeFood?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    beehive?: BeehiveUpdateOneRequiredWithoutFoodsNestedInput
  }

  export type FoodUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    beehiveId?: IntFieldUpdateOperationsInput | number
    dateFeeding?: DateTimeFieldUpdateOperationsInput | Date | string
    typeFood?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FoodCreateManyInput = {
    id?: number
    beehiveId: number
    dateFeeding: Date | string
    typeFood: string
    amount: Decimal | DecimalJsLike | number | string
    observations?: string | null
  }

  export type FoodUpdateManyMutationInput = {
    dateFeeding?: DateTimeFieldUpdateOperationsInput | Date | string
    typeFood?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FoodUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    beehiveId?: IntFieldUpdateOperationsInput | number
    dateFeeding?: DateTimeFieldUpdateOperationsInput | Date | string
    typeFood?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DiseaseCreateInput = {
    dateDiagnosis: Date | string
    diseasePrague: string
    treatment: string
    observations?: string | null
    beehive: BeehiveCreateNestedOneWithoutDiseasesInput
  }

  export type DiseaseUncheckedCreateInput = {
    id?: number
    beehiveId: number
    dateDiagnosis: Date | string
    diseasePrague: string
    treatment: string
    observations?: string | null
  }

  export type DiseaseUpdateInput = {
    dateDiagnosis?: DateTimeFieldUpdateOperationsInput | Date | string
    diseasePrague?: StringFieldUpdateOperationsInput | string
    treatment?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    beehive?: BeehiveUpdateOneRequiredWithoutDiseasesNestedInput
  }

  export type DiseaseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    beehiveId?: IntFieldUpdateOperationsInput | number
    dateDiagnosis?: DateTimeFieldUpdateOperationsInput | Date | string
    diseasePrague?: StringFieldUpdateOperationsInput | string
    treatment?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DiseaseCreateManyInput = {
    id?: number
    beehiveId: number
    dateDiagnosis: Date | string
    diseasePrague: string
    treatment: string
    observations?: string | null
  }

  export type DiseaseUpdateManyMutationInput = {
    dateDiagnosis?: DateTimeFieldUpdateOperationsInput | Date | string
    diseasePrague?: StringFieldUpdateOperationsInput | string
    treatment?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DiseaseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    beehiveId?: IntFieldUpdateOperationsInput | number
    dateDiagnosis?: DateTimeFieldUpdateOperationsInput | Date | string
    diseasePrague?: StringFieldUpdateOperationsInput | string
    treatment?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BeehiveListRelationFilter = {
    every?: BeehiveWhereInput
    some?: BeehiveWhereInput
    none?: BeehiveWhereInput
  }

  export type BeehiveOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProducerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    cpfCnpj?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    startDate?: SortOrder
    status?: SortOrder
  }

  export type ProducerAvgOrderByAggregateInput = {
    id?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
  }

  export type ProducerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    cpfCnpj?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    startDate?: SortOrder
    status?: SortOrder
  }

  export type ProducerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    cpfCnpj?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    startDate?: SortOrder
    status?: SortOrder
  }

  export type ProducerSumOrderByAggregateInput = {
    id?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ProducerScalarRelationFilter = {
    is?: ProducerWhereInput
    isNot?: ProducerWhereInput
  }

  export type ActivityListRelationFilter = {
    every?: ActivityWhereInput
    some?: ActivityWhereInput
    none?: ActivityWhereInput
  }

  export type ProductionHoneyListRelationFilter = {
    every?: ProductionHoneyWhereInput
    some?: ProductionHoneyWhereInput
    none?: ProductionHoneyWhereInput
  }

  export type TemperaturesHumidityListRelationFilter = {
    every?: TemperaturesHumidityWhereInput
    some?: TemperaturesHumidityWhereInput
    none?: TemperaturesHumidityWhereInput
  }

  export type FoodListRelationFilter = {
    every?: FoodWhereInput
    some?: FoodWhereInput
    none?: FoodWhereInput
  }

  export type DiseaseListRelationFilter = {
    every?: DiseaseWhereInput
    some?: DiseaseWhereInput
    none?: DiseaseWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductionHoneyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TemperaturesHumidityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FoodOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DiseaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BeehiveCountOrderByAggregateInput = {
    id?: SortOrder
    producerId?: SortOrder
    name?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    startDate?: SortOrder
    status?: SortOrder
    typeBeehive?: SortOrder
    observations?: SortOrder
  }

  export type BeehiveAvgOrderByAggregateInput = {
    id?: SortOrder
    producerId?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
  }

  export type BeehiveMaxOrderByAggregateInput = {
    id?: SortOrder
    producerId?: SortOrder
    name?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    startDate?: SortOrder
    status?: SortOrder
    typeBeehive?: SortOrder
    observations?: SortOrder
  }

  export type BeehiveMinOrderByAggregateInput = {
    id?: SortOrder
    producerId?: SortOrder
    name?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
    startDate?: SortOrder
    status?: SortOrder
    typeBeehive?: SortOrder
    observations?: SortOrder
  }

  export type BeehiveSumOrderByAggregateInput = {
    id?: SortOrder
    producerId?: SortOrder
    longitude?: SortOrder
    latitude?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BeehiveScalarRelationFilter = {
    is?: BeehiveWhereInput
    isNot?: BeehiveWhereInput
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateActivity?: SortOrder
    typeActivity?: SortOrder
    descriptions?: SortOrder
    observations?: SortOrder
  }

  export type ActivityAvgOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateActivity?: SortOrder
    typeActivity?: SortOrder
    descriptions?: SortOrder
    observations?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateActivity?: SortOrder
    typeActivity?: SortOrder
    descriptions?: SortOrder
    observations?: SortOrder
  }

  export type ActivitySumOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type ProductionHoneyCountOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateCollection?: SortOrder
    amount?: SortOrder
    quality?: SortOrder
    observations?: SortOrder
  }

  export type ProductionHoneyAvgOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    amount?: SortOrder
  }

  export type ProductionHoneyMaxOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateCollection?: SortOrder
    amount?: SortOrder
    quality?: SortOrder
    observations?: SortOrder
  }

  export type ProductionHoneyMinOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateCollection?: SortOrder
    amount?: SortOrder
    quality?: SortOrder
    observations?: SortOrder
  }

  export type ProductionHoneySumOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    amount?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type TemperaturesHumidityCountOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateMeasurement?: SortOrder
    internalTemperature?: SortOrder
    externalTemperature?: SortOrder
    humidityInternal?: SortOrder
    humidityExternal?: SortOrder
  }

  export type TemperaturesHumidityAvgOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    internalTemperature?: SortOrder
    externalTemperature?: SortOrder
    humidityInternal?: SortOrder
    humidityExternal?: SortOrder
  }

  export type TemperaturesHumidityMaxOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateMeasurement?: SortOrder
    internalTemperature?: SortOrder
    externalTemperature?: SortOrder
    humidityInternal?: SortOrder
    humidityExternal?: SortOrder
  }

  export type TemperaturesHumidityMinOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateMeasurement?: SortOrder
    internalTemperature?: SortOrder
    externalTemperature?: SortOrder
    humidityInternal?: SortOrder
    humidityExternal?: SortOrder
  }

  export type TemperaturesHumiditySumOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    internalTemperature?: SortOrder
    externalTemperature?: SortOrder
    humidityInternal?: SortOrder
    humidityExternal?: SortOrder
  }

  export type FoodCountOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateFeeding?: SortOrder
    typeFood?: SortOrder
    amount?: SortOrder
    observations?: SortOrder
  }

  export type FoodAvgOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    amount?: SortOrder
  }

  export type FoodMaxOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateFeeding?: SortOrder
    typeFood?: SortOrder
    amount?: SortOrder
    observations?: SortOrder
  }

  export type FoodMinOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateFeeding?: SortOrder
    typeFood?: SortOrder
    amount?: SortOrder
    observations?: SortOrder
  }

  export type FoodSumOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    amount?: SortOrder
  }

  export type DiseaseCountOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateDiagnosis?: SortOrder
    diseasePrague?: SortOrder
    treatment?: SortOrder
    observations?: SortOrder
  }

  export type DiseaseAvgOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
  }

  export type DiseaseMaxOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateDiagnosis?: SortOrder
    diseasePrague?: SortOrder
    treatment?: SortOrder
    observations?: SortOrder
  }

  export type DiseaseMinOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
    dateDiagnosis?: SortOrder
    diseasePrague?: SortOrder
    treatment?: SortOrder
    observations?: SortOrder
  }

  export type DiseaseSumOrderByAggregateInput = {
    id?: SortOrder
    beehiveId?: SortOrder
  }

  export type BeehiveCreateNestedManyWithoutProducerInput = {
    create?: XOR<BeehiveCreateWithoutProducerInput, BeehiveUncheckedCreateWithoutProducerInput> | BeehiveCreateWithoutProducerInput[] | BeehiveUncheckedCreateWithoutProducerInput[]
    connectOrCreate?: BeehiveCreateOrConnectWithoutProducerInput | BeehiveCreateOrConnectWithoutProducerInput[]
    createMany?: BeehiveCreateManyProducerInputEnvelope
    connect?: BeehiveWhereUniqueInput | BeehiveWhereUniqueInput[]
  }

  export type BeehiveUncheckedCreateNestedManyWithoutProducerInput = {
    create?: XOR<BeehiveCreateWithoutProducerInput, BeehiveUncheckedCreateWithoutProducerInput> | BeehiveCreateWithoutProducerInput[] | BeehiveUncheckedCreateWithoutProducerInput[]
    connectOrCreate?: BeehiveCreateOrConnectWithoutProducerInput | BeehiveCreateOrConnectWithoutProducerInput[]
    createMany?: BeehiveCreateManyProducerInputEnvelope
    connect?: BeehiveWhereUniqueInput | BeehiveWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BeehiveUpdateManyWithoutProducerNestedInput = {
    create?: XOR<BeehiveCreateWithoutProducerInput, BeehiveUncheckedCreateWithoutProducerInput> | BeehiveCreateWithoutProducerInput[] | BeehiveUncheckedCreateWithoutProducerInput[]
    connectOrCreate?: BeehiveCreateOrConnectWithoutProducerInput | BeehiveCreateOrConnectWithoutProducerInput[]
    upsert?: BeehiveUpsertWithWhereUniqueWithoutProducerInput | BeehiveUpsertWithWhereUniqueWithoutProducerInput[]
    createMany?: BeehiveCreateManyProducerInputEnvelope
    set?: BeehiveWhereUniqueInput | BeehiveWhereUniqueInput[]
    disconnect?: BeehiveWhereUniqueInput | BeehiveWhereUniqueInput[]
    delete?: BeehiveWhereUniqueInput | BeehiveWhereUniqueInput[]
    connect?: BeehiveWhereUniqueInput | BeehiveWhereUniqueInput[]
    update?: BeehiveUpdateWithWhereUniqueWithoutProducerInput | BeehiveUpdateWithWhereUniqueWithoutProducerInput[]
    updateMany?: BeehiveUpdateManyWithWhereWithoutProducerInput | BeehiveUpdateManyWithWhereWithoutProducerInput[]
    deleteMany?: BeehiveScalarWhereInput | BeehiveScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BeehiveUncheckedUpdateManyWithoutProducerNestedInput = {
    create?: XOR<BeehiveCreateWithoutProducerInput, BeehiveUncheckedCreateWithoutProducerInput> | BeehiveCreateWithoutProducerInput[] | BeehiveUncheckedCreateWithoutProducerInput[]
    connectOrCreate?: BeehiveCreateOrConnectWithoutProducerInput | BeehiveCreateOrConnectWithoutProducerInput[]
    upsert?: BeehiveUpsertWithWhereUniqueWithoutProducerInput | BeehiveUpsertWithWhereUniqueWithoutProducerInput[]
    createMany?: BeehiveCreateManyProducerInputEnvelope
    set?: BeehiveWhereUniqueInput | BeehiveWhereUniqueInput[]
    disconnect?: BeehiveWhereUniqueInput | BeehiveWhereUniqueInput[]
    delete?: BeehiveWhereUniqueInput | BeehiveWhereUniqueInput[]
    connect?: BeehiveWhereUniqueInput | BeehiveWhereUniqueInput[]
    update?: BeehiveUpdateWithWhereUniqueWithoutProducerInput | BeehiveUpdateWithWhereUniqueWithoutProducerInput[]
    updateMany?: BeehiveUpdateManyWithWhereWithoutProducerInput | BeehiveUpdateManyWithWhereWithoutProducerInput[]
    deleteMany?: BeehiveScalarWhereInput | BeehiveScalarWhereInput[]
  }

  export type ProducerCreateNestedOneWithoutBeehivesInput = {
    create?: XOR<ProducerCreateWithoutBeehivesInput, ProducerUncheckedCreateWithoutBeehivesInput>
    connectOrCreate?: ProducerCreateOrConnectWithoutBeehivesInput
    connect?: ProducerWhereUniqueInput
  }

  export type ActivityCreateNestedManyWithoutBeehiveInput = {
    create?: XOR<ActivityCreateWithoutBeehiveInput, ActivityUncheckedCreateWithoutBeehiveInput> | ActivityCreateWithoutBeehiveInput[] | ActivityUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutBeehiveInput | ActivityCreateOrConnectWithoutBeehiveInput[]
    createMany?: ActivityCreateManyBeehiveInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type ProductionHoneyCreateNestedManyWithoutBeehiveInput = {
    create?: XOR<ProductionHoneyCreateWithoutBeehiveInput, ProductionHoneyUncheckedCreateWithoutBeehiveInput> | ProductionHoneyCreateWithoutBeehiveInput[] | ProductionHoneyUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: ProductionHoneyCreateOrConnectWithoutBeehiveInput | ProductionHoneyCreateOrConnectWithoutBeehiveInput[]
    createMany?: ProductionHoneyCreateManyBeehiveInputEnvelope
    connect?: ProductionHoneyWhereUniqueInput | ProductionHoneyWhereUniqueInput[]
  }

  export type TemperaturesHumidityCreateNestedManyWithoutBeehiveInput = {
    create?: XOR<TemperaturesHumidityCreateWithoutBeehiveInput, TemperaturesHumidityUncheckedCreateWithoutBeehiveInput> | TemperaturesHumidityCreateWithoutBeehiveInput[] | TemperaturesHumidityUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: TemperaturesHumidityCreateOrConnectWithoutBeehiveInput | TemperaturesHumidityCreateOrConnectWithoutBeehiveInput[]
    createMany?: TemperaturesHumidityCreateManyBeehiveInputEnvelope
    connect?: TemperaturesHumidityWhereUniqueInput | TemperaturesHumidityWhereUniqueInput[]
  }

  export type FoodCreateNestedManyWithoutBeehiveInput = {
    create?: XOR<FoodCreateWithoutBeehiveInput, FoodUncheckedCreateWithoutBeehiveInput> | FoodCreateWithoutBeehiveInput[] | FoodUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: FoodCreateOrConnectWithoutBeehiveInput | FoodCreateOrConnectWithoutBeehiveInput[]
    createMany?: FoodCreateManyBeehiveInputEnvelope
    connect?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
  }

  export type DiseaseCreateNestedManyWithoutBeehiveInput = {
    create?: XOR<DiseaseCreateWithoutBeehiveInput, DiseaseUncheckedCreateWithoutBeehiveInput> | DiseaseCreateWithoutBeehiveInput[] | DiseaseUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: DiseaseCreateOrConnectWithoutBeehiveInput | DiseaseCreateOrConnectWithoutBeehiveInput[]
    createMany?: DiseaseCreateManyBeehiveInputEnvelope
    connect?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutBeehiveInput = {
    create?: XOR<ActivityCreateWithoutBeehiveInput, ActivityUncheckedCreateWithoutBeehiveInput> | ActivityCreateWithoutBeehiveInput[] | ActivityUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutBeehiveInput | ActivityCreateOrConnectWithoutBeehiveInput[]
    createMany?: ActivityCreateManyBeehiveInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type ProductionHoneyUncheckedCreateNestedManyWithoutBeehiveInput = {
    create?: XOR<ProductionHoneyCreateWithoutBeehiveInput, ProductionHoneyUncheckedCreateWithoutBeehiveInput> | ProductionHoneyCreateWithoutBeehiveInput[] | ProductionHoneyUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: ProductionHoneyCreateOrConnectWithoutBeehiveInput | ProductionHoneyCreateOrConnectWithoutBeehiveInput[]
    createMany?: ProductionHoneyCreateManyBeehiveInputEnvelope
    connect?: ProductionHoneyWhereUniqueInput | ProductionHoneyWhereUniqueInput[]
  }

  export type TemperaturesHumidityUncheckedCreateNestedManyWithoutBeehiveInput = {
    create?: XOR<TemperaturesHumidityCreateWithoutBeehiveInput, TemperaturesHumidityUncheckedCreateWithoutBeehiveInput> | TemperaturesHumidityCreateWithoutBeehiveInput[] | TemperaturesHumidityUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: TemperaturesHumidityCreateOrConnectWithoutBeehiveInput | TemperaturesHumidityCreateOrConnectWithoutBeehiveInput[]
    createMany?: TemperaturesHumidityCreateManyBeehiveInputEnvelope
    connect?: TemperaturesHumidityWhereUniqueInput | TemperaturesHumidityWhereUniqueInput[]
  }

  export type FoodUncheckedCreateNestedManyWithoutBeehiveInput = {
    create?: XOR<FoodCreateWithoutBeehiveInput, FoodUncheckedCreateWithoutBeehiveInput> | FoodCreateWithoutBeehiveInput[] | FoodUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: FoodCreateOrConnectWithoutBeehiveInput | FoodCreateOrConnectWithoutBeehiveInput[]
    createMany?: FoodCreateManyBeehiveInputEnvelope
    connect?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
  }

  export type DiseaseUncheckedCreateNestedManyWithoutBeehiveInput = {
    create?: XOR<DiseaseCreateWithoutBeehiveInput, DiseaseUncheckedCreateWithoutBeehiveInput> | DiseaseCreateWithoutBeehiveInput[] | DiseaseUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: DiseaseCreateOrConnectWithoutBeehiveInput | DiseaseCreateOrConnectWithoutBeehiveInput[]
    createMany?: DiseaseCreateManyBeehiveInputEnvelope
    connect?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ProducerUpdateOneRequiredWithoutBeehivesNestedInput = {
    create?: XOR<ProducerCreateWithoutBeehivesInput, ProducerUncheckedCreateWithoutBeehivesInput>
    connectOrCreate?: ProducerCreateOrConnectWithoutBeehivesInput
    upsert?: ProducerUpsertWithoutBeehivesInput
    connect?: ProducerWhereUniqueInput
    update?: XOR<XOR<ProducerUpdateToOneWithWhereWithoutBeehivesInput, ProducerUpdateWithoutBeehivesInput>, ProducerUncheckedUpdateWithoutBeehivesInput>
  }

  export type ActivityUpdateManyWithoutBeehiveNestedInput = {
    create?: XOR<ActivityCreateWithoutBeehiveInput, ActivityUncheckedCreateWithoutBeehiveInput> | ActivityCreateWithoutBeehiveInput[] | ActivityUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutBeehiveInput | ActivityCreateOrConnectWithoutBeehiveInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutBeehiveInput | ActivityUpsertWithWhereUniqueWithoutBeehiveInput[]
    createMany?: ActivityCreateManyBeehiveInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutBeehiveInput | ActivityUpdateWithWhereUniqueWithoutBeehiveInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutBeehiveInput | ActivityUpdateManyWithWhereWithoutBeehiveInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type ProductionHoneyUpdateManyWithoutBeehiveNestedInput = {
    create?: XOR<ProductionHoneyCreateWithoutBeehiveInput, ProductionHoneyUncheckedCreateWithoutBeehiveInput> | ProductionHoneyCreateWithoutBeehiveInput[] | ProductionHoneyUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: ProductionHoneyCreateOrConnectWithoutBeehiveInput | ProductionHoneyCreateOrConnectWithoutBeehiveInput[]
    upsert?: ProductionHoneyUpsertWithWhereUniqueWithoutBeehiveInput | ProductionHoneyUpsertWithWhereUniqueWithoutBeehiveInput[]
    createMany?: ProductionHoneyCreateManyBeehiveInputEnvelope
    set?: ProductionHoneyWhereUniqueInput | ProductionHoneyWhereUniqueInput[]
    disconnect?: ProductionHoneyWhereUniqueInput | ProductionHoneyWhereUniqueInput[]
    delete?: ProductionHoneyWhereUniqueInput | ProductionHoneyWhereUniqueInput[]
    connect?: ProductionHoneyWhereUniqueInput | ProductionHoneyWhereUniqueInput[]
    update?: ProductionHoneyUpdateWithWhereUniqueWithoutBeehiveInput | ProductionHoneyUpdateWithWhereUniqueWithoutBeehiveInput[]
    updateMany?: ProductionHoneyUpdateManyWithWhereWithoutBeehiveInput | ProductionHoneyUpdateManyWithWhereWithoutBeehiveInput[]
    deleteMany?: ProductionHoneyScalarWhereInput | ProductionHoneyScalarWhereInput[]
  }

  export type TemperaturesHumidityUpdateManyWithoutBeehiveNestedInput = {
    create?: XOR<TemperaturesHumidityCreateWithoutBeehiveInput, TemperaturesHumidityUncheckedCreateWithoutBeehiveInput> | TemperaturesHumidityCreateWithoutBeehiveInput[] | TemperaturesHumidityUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: TemperaturesHumidityCreateOrConnectWithoutBeehiveInput | TemperaturesHumidityCreateOrConnectWithoutBeehiveInput[]
    upsert?: TemperaturesHumidityUpsertWithWhereUniqueWithoutBeehiveInput | TemperaturesHumidityUpsertWithWhereUniqueWithoutBeehiveInput[]
    createMany?: TemperaturesHumidityCreateManyBeehiveInputEnvelope
    set?: TemperaturesHumidityWhereUniqueInput | TemperaturesHumidityWhereUniqueInput[]
    disconnect?: TemperaturesHumidityWhereUniqueInput | TemperaturesHumidityWhereUniqueInput[]
    delete?: TemperaturesHumidityWhereUniqueInput | TemperaturesHumidityWhereUniqueInput[]
    connect?: TemperaturesHumidityWhereUniqueInput | TemperaturesHumidityWhereUniqueInput[]
    update?: TemperaturesHumidityUpdateWithWhereUniqueWithoutBeehiveInput | TemperaturesHumidityUpdateWithWhereUniqueWithoutBeehiveInput[]
    updateMany?: TemperaturesHumidityUpdateManyWithWhereWithoutBeehiveInput | TemperaturesHumidityUpdateManyWithWhereWithoutBeehiveInput[]
    deleteMany?: TemperaturesHumidityScalarWhereInput | TemperaturesHumidityScalarWhereInput[]
  }

  export type FoodUpdateManyWithoutBeehiveNestedInput = {
    create?: XOR<FoodCreateWithoutBeehiveInput, FoodUncheckedCreateWithoutBeehiveInput> | FoodCreateWithoutBeehiveInput[] | FoodUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: FoodCreateOrConnectWithoutBeehiveInput | FoodCreateOrConnectWithoutBeehiveInput[]
    upsert?: FoodUpsertWithWhereUniqueWithoutBeehiveInput | FoodUpsertWithWhereUniqueWithoutBeehiveInput[]
    createMany?: FoodCreateManyBeehiveInputEnvelope
    set?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
    disconnect?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
    delete?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
    connect?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
    update?: FoodUpdateWithWhereUniqueWithoutBeehiveInput | FoodUpdateWithWhereUniqueWithoutBeehiveInput[]
    updateMany?: FoodUpdateManyWithWhereWithoutBeehiveInput | FoodUpdateManyWithWhereWithoutBeehiveInput[]
    deleteMany?: FoodScalarWhereInput | FoodScalarWhereInput[]
  }

  export type DiseaseUpdateManyWithoutBeehiveNestedInput = {
    create?: XOR<DiseaseCreateWithoutBeehiveInput, DiseaseUncheckedCreateWithoutBeehiveInput> | DiseaseCreateWithoutBeehiveInput[] | DiseaseUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: DiseaseCreateOrConnectWithoutBeehiveInput | DiseaseCreateOrConnectWithoutBeehiveInput[]
    upsert?: DiseaseUpsertWithWhereUniqueWithoutBeehiveInput | DiseaseUpsertWithWhereUniqueWithoutBeehiveInput[]
    createMany?: DiseaseCreateManyBeehiveInputEnvelope
    set?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
    disconnect?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
    delete?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
    connect?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
    update?: DiseaseUpdateWithWhereUniqueWithoutBeehiveInput | DiseaseUpdateWithWhereUniqueWithoutBeehiveInput[]
    updateMany?: DiseaseUpdateManyWithWhereWithoutBeehiveInput | DiseaseUpdateManyWithWhereWithoutBeehiveInput[]
    deleteMany?: DiseaseScalarWhereInput | DiseaseScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutBeehiveNestedInput = {
    create?: XOR<ActivityCreateWithoutBeehiveInput, ActivityUncheckedCreateWithoutBeehiveInput> | ActivityCreateWithoutBeehiveInput[] | ActivityUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutBeehiveInput | ActivityCreateOrConnectWithoutBeehiveInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutBeehiveInput | ActivityUpsertWithWhereUniqueWithoutBeehiveInput[]
    createMany?: ActivityCreateManyBeehiveInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutBeehiveInput | ActivityUpdateWithWhereUniqueWithoutBeehiveInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutBeehiveInput | ActivityUpdateManyWithWhereWithoutBeehiveInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type ProductionHoneyUncheckedUpdateManyWithoutBeehiveNestedInput = {
    create?: XOR<ProductionHoneyCreateWithoutBeehiveInput, ProductionHoneyUncheckedCreateWithoutBeehiveInput> | ProductionHoneyCreateWithoutBeehiveInput[] | ProductionHoneyUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: ProductionHoneyCreateOrConnectWithoutBeehiveInput | ProductionHoneyCreateOrConnectWithoutBeehiveInput[]
    upsert?: ProductionHoneyUpsertWithWhereUniqueWithoutBeehiveInput | ProductionHoneyUpsertWithWhereUniqueWithoutBeehiveInput[]
    createMany?: ProductionHoneyCreateManyBeehiveInputEnvelope
    set?: ProductionHoneyWhereUniqueInput | ProductionHoneyWhereUniqueInput[]
    disconnect?: ProductionHoneyWhereUniqueInput | ProductionHoneyWhereUniqueInput[]
    delete?: ProductionHoneyWhereUniqueInput | ProductionHoneyWhereUniqueInput[]
    connect?: ProductionHoneyWhereUniqueInput | ProductionHoneyWhereUniqueInput[]
    update?: ProductionHoneyUpdateWithWhereUniqueWithoutBeehiveInput | ProductionHoneyUpdateWithWhereUniqueWithoutBeehiveInput[]
    updateMany?: ProductionHoneyUpdateManyWithWhereWithoutBeehiveInput | ProductionHoneyUpdateManyWithWhereWithoutBeehiveInput[]
    deleteMany?: ProductionHoneyScalarWhereInput | ProductionHoneyScalarWhereInput[]
  }

  export type TemperaturesHumidityUncheckedUpdateManyWithoutBeehiveNestedInput = {
    create?: XOR<TemperaturesHumidityCreateWithoutBeehiveInput, TemperaturesHumidityUncheckedCreateWithoutBeehiveInput> | TemperaturesHumidityCreateWithoutBeehiveInput[] | TemperaturesHumidityUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: TemperaturesHumidityCreateOrConnectWithoutBeehiveInput | TemperaturesHumidityCreateOrConnectWithoutBeehiveInput[]
    upsert?: TemperaturesHumidityUpsertWithWhereUniqueWithoutBeehiveInput | TemperaturesHumidityUpsertWithWhereUniqueWithoutBeehiveInput[]
    createMany?: TemperaturesHumidityCreateManyBeehiveInputEnvelope
    set?: TemperaturesHumidityWhereUniqueInput | TemperaturesHumidityWhereUniqueInput[]
    disconnect?: TemperaturesHumidityWhereUniqueInput | TemperaturesHumidityWhereUniqueInput[]
    delete?: TemperaturesHumidityWhereUniqueInput | TemperaturesHumidityWhereUniqueInput[]
    connect?: TemperaturesHumidityWhereUniqueInput | TemperaturesHumidityWhereUniqueInput[]
    update?: TemperaturesHumidityUpdateWithWhereUniqueWithoutBeehiveInput | TemperaturesHumidityUpdateWithWhereUniqueWithoutBeehiveInput[]
    updateMany?: TemperaturesHumidityUpdateManyWithWhereWithoutBeehiveInput | TemperaturesHumidityUpdateManyWithWhereWithoutBeehiveInput[]
    deleteMany?: TemperaturesHumidityScalarWhereInput | TemperaturesHumidityScalarWhereInput[]
  }

  export type FoodUncheckedUpdateManyWithoutBeehiveNestedInput = {
    create?: XOR<FoodCreateWithoutBeehiveInput, FoodUncheckedCreateWithoutBeehiveInput> | FoodCreateWithoutBeehiveInput[] | FoodUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: FoodCreateOrConnectWithoutBeehiveInput | FoodCreateOrConnectWithoutBeehiveInput[]
    upsert?: FoodUpsertWithWhereUniqueWithoutBeehiveInput | FoodUpsertWithWhereUniqueWithoutBeehiveInput[]
    createMany?: FoodCreateManyBeehiveInputEnvelope
    set?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
    disconnect?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
    delete?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
    connect?: FoodWhereUniqueInput | FoodWhereUniqueInput[]
    update?: FoodUpdateWithWhereUniqueWithoutBeehiveInput | FoodUpdateWithWhereUniqueWithoutBeehiveInput[]
    updateMany?: FoodUpdateManyWithWhereWithoutBeehiveInput | FoodUpdateManyWithWhereWithoutBeehiveInput[]
    deleteMany?: FoodScalarWhereInput | FoodScalarWhereInput[]
  }

  export type DiseaseUncheckedUpdateManyWithoutBeehiveNestedInput = {
    create?: XOR<DiseaseCreateWithoutBeehiveInput, DiseaseUncheckedCreateWithoutBeehiveInput> | DiseaseCreateWithoutBeehiveInput[] | DiseaseUncheckedCreateWithoutBeehiveInput[]
    connectOrCreate?: DiseaseCreateOrConnectWithoutBeehiveInput | DiseaseCreateOrConnectWithoutBeehiveInput[]
    upsert?: DiseaseUpsertWithWhereUniqueWithoutBeehiveInput | DiseaseUpsertWithWhereUniqueWithoutBeehiveInput[]
    createMany?: DiseaseCreateManyBeehiveInputEnvelope
    set?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
    disconnect?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
    delete?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
    connect?: DiseaseWhereUniqueInput | DiseaseWhereUniqueInput[]
    update?: DiseaseUpdateWithWhereUniqueWithoutBeehiveInput | DiseaseUpdateWithWhereUniqueWithoutBeehiveInput[]
    updateMany?: DiseaseUpdateManyWithWhereWithoutBeehiveInput | DiseaseUpdateManyWithWhereWithoutBeehiveInput[]
    deleteMany?: DiseaseScalarWhereInput | DiseaseScalarWhereInput[]
  }

  export type BeehiveCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<BeehiveCreateWithoutActivitiesInput, BeehiveUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: BeehiveCreateOrConnectWithoutActivitiesInput
    connect?: BeehiveWhereUniqueInput
  }

  export type BeehiveUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<BeehiveCreateWithoutActivitiesInput, BeehiveUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: BeehiveCreateOrConnectWithoutActivitiesInput
    upsert?: BeehiveUpsertWithoutActivitiesInput
    connect?: BeehiveWhereUniqueInput
    update?: XOR<XOR<BeehiveUpdateToOneWithWhereWithoutActivitiesInput, BeehiveUpdateWithoutActivitiesInput>, BeehiveUncheckedUpdateWithoutActivitiesInput>
  }

  export type BeehiveCreateNestedOneWithoutProductionsHoneyInput = {
    create?: XOR<BeehiveCreateWithoutProductionsHoneyInput, BeehiveUncheckedCreateWithoutProductionsHoneyInput>
    connectOrCreate?: BeehiveCreateOrConnectWithoutProductionsHoneyInput
    connect?: BeehiveWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type BeehiveUpdateOneRequiredWithoutProductionsHoneyNestedInput = {
    create?: XOR<BeehiveCreateWithoutProductionsHoneyInput, BeehiveUncheckedCreateWithoutProductionsHoneyInput>
    connectOrCreate?: BeehiveCreateOrConnectWithoutProductionsHoneyInput
    upsert?: BeehiveUpsertWithoutProductionsHoneyInput
    connect?: BeehiveWhereUniqueInput
    update?: XOR<XOR<BeehiveUpdateToOneWithWhereWithoutProductionsHoneyInput, BeehiveUpdateWithoutProductionsHoneyInput>, BeehiveUncheckedUpdateWithoutProductionsHoneyInput>
  }

  export type BeehiveCreateNestedOneWithoutTemperaturesHumiditiesInput = {
    create?: XOR<BeehiveCreateWithoutTemperaturesHumiditiesInput, BeehiveUncheckedCreateWithoutTemperaturesHumiditiesInput>
    connectOrCreate?: BeehiveCreateOrConnectWithoutTemperaturesHumiditiesInput
    connect?: BeehiveWhereUniqueInput
  }

  export type BeehiveUpdateOneRequiredWithoutTemperaturesHumiditiesNestedInput = {
    create?: XOR<BeehiveCreateWithoutTemperaturesHumiditiesInput, BeehiveUncheckedCreateWithoutTemperaturesHumiditiesInput>
    connectOrCreate?: BeehiveCreateOrConnectWithoutTemperaturesHumiditiesInput
    upsert?: BeehiveUpsertWithoutTemperaturesHumiditiesInput
    connect?: BeehiveWhereUniqueInput
    update?: XOR<XOR<BeehiveUpdateToOneWithWhereWithoutTemperaturesHumiditiesInput, BeehiveUpdateWithoutTemperaturesHumiditiesInput>, BeehiveUncheckedUpdateWithoutTemperaturesHumiditiesInput>
  }

  export type BeehiveCreateNestedOneWithoutFoodsInput = {
    create?: XOR<BeehiveCreateWithoutFoodsInput, BeehiveUncheckedCreateWithoutFoodsInput>
    connectOrCreate?: BeehiveCreateOrConnectWithoutFoodsInput
    connect?: BeehiveWhereUniqueInput
  }

  export type BeehiveUpdateOneRequiredWithoutFoodsNestedInput = {
    create?: XOR<BeehiveCreateWithoutFoodsInput, BeehiveUncheckedCreateWithoutFoodsInput>
    connectOrCreate?: BeehiveCreateOrConnectWithoutFoodsInput
    upsert?: BeehiveUpsertWithoutFoodsInput
    connect?: BeehiveWhereUniqueInput
    update?: XOR<XOR<BeehiveUpdateToOneWithWhereWithoutFoodsInput, BeehiveUpdateWithoutFoodsInput>, BeehiveUncheckedUpdateWithoutFoodsInput>
  }

  export type BeehiveCreateNestedOneWithoutDiseasesInput = {
    create?: XOR<BeehiveCreateWithoutDiseasesInput, BeehiveUncheckedCreateWithoutDiseasesInput>
    connectOrCreate?: BeehiveCreateOrConnectWithoutDiseasesInput
    connect?: BeehiveWhereUniqueInput
  }

  export type BeehiveUpdateOneRequiredWithoutDiseasesNestedInput = {
    create?: XOR<BeehiveCreateWithoutDiseasesInput, BeehiveUncheckedCreateWithoutDiseasesInput>
    connectOrCreate?: BeehiveCreateOrConnectWithoutDiseasesInput
    upsert?: BeehiveUpsertWithoutDiseasesInput
    connect?: BeehiveWhereUniqueInput
    update?: XOR<XOR<BeehiveUpdateToOneWithWhereWithoutDiseasesInput, BeehiveUpdateWithoutDiseasesInput>, BeehiveUncheckedUpdateWithoutDiseasesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type BeehiveCreateWithoutProducerInput = {
    name: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    typeBeehive: string
    observations?: string | null
    activities?: ActivityCreateNestedManyWithoutBeehiveInput
    productionsHoney?: ProductionHoneyCreateNestedManyWithoutBeehiveInput
    temperaturesHumidities?: TemperaturesHumidityCreateNestedManyWithoutBeehiveInput
    foods?: FoodCreateNestedManyWithoutBeehiveInput
    diseases?: DiseaseCreateNestedManyWithoutBeehiveInput
  }

  export type BeehiveUncheckedCreateWithoutProducerInput = {
    id?: number
    name: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    typeBeehive: string
    observations?: string | null
    activities?: ActivityUncheckedCreateNestedManyWithoutBeehiveInput
    productionsHoney?: ProductionHoneyUncheckedCreateNestedManyWithoutBeehiveInput
    temperaturesHumidities?: TemperaturesHumidityUncheckedCreateNestedManyWithoutBeehiveInput
    foods?: FoodUncheckedCreateNestedManyWithoutBeehiveInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutBeehiveInput
  }

  export type BeehiveCreateOrConnectWithoutProducerInput = {
    where: BeehiveWhereUniqueInput
    create: XOR<BeehiveCreateWithoutProducerInput, BeehiveUncheckedCreateWithoutProducerInput>
  }

  export type BeehiveCreateManyProducerInputEnvelope = {
    data: BeehiveCreateManyProducerInput | BeehiveCreateManyProducerInput[]
  }

  export type BeehiveUpsertWithWhereUniqueWithoutProducerInput = {
    where: BeehiveWhereUniqueInput
    update: XOR<BeehiveUpdateWithoutProducerInput, BeehiveUncheckedUpdateWithoutProducerInput>
    create: XOR<BeehiveCreateWithoutProducerInput, BeehiveUncheckedCreateWithoutProducerInput>
  }

  export type BeehiveUpdateWithWhereUniqueWithoutProducerInput = {
    where: BeehiveWhereUniqueInput
    data: XOR<BeehiveUpdateWithoutProducerInput, BeehiveUncheckedUpdateWithoutProducerInput>
  }

  export type BeehiveUpdateManyWithWhereWithoutProducerInput = {
    where: BeehiveScalarWhereInput
    data: XOR<BeehiveUpdateManyMutationInput, BeehiveUncheckedUpdateManyWithoutProducerInput>
  }

  export type BeehiveScalarWhereInput = {
    AND?: BeehiveScalarWhereInput | BeehiveScalarWhereInput[]
    OR?: BeehiveScalarWhereInput[]
    NOT?: BeehiveScalarWhereInput | BeehiveScalarWhereInput[]
    id?: IntFilter<"Beehive"> | number
    producerId?: IntFilter<"Beehive"> | number
    name?: StringFilter<"Beehive"> | string
    longitude?: FloatFilter<"Beehive"> | number
    latitude?: FloatFilter<"Beehive"> | number
    startDate?: DateTimeFilter<"Beehive"> | Date | string
    status?: StringFilter<"Beehive"> | string
    typeBeehive?: StringFilter<"Beehive"> | string
    observations?: StringNullableFilter<"Beehive"> | string | null
  }

  export type ProducerCreateWithoutBeehivesInput = {
    name: string
    email: string
    password: string
    cpfCnpj: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
  }

  export type ProducerUncheckedCreateWithoutBeehivesInput = {
    id?: number
    name: string
    email: string
    password: string
    cpfCnpj: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
  }

  export type ProducerCreateOrConnectWithoutBeehivesInput = {
    where: ProducerWhereUniqueInput
    create: XOR<ProducerCreateWithoutBeehivesInput, ProducerUncheckedCreateWithoutBeehivesInput>
  }

  export type ActivityCreateWithoutBeehiveInput = {
    dateActivity: Date | string
    typeActivity: string
    descriptions: string
    observations?: string | null
  }

  export type ActivityUncheckedCreateWithoutBeehiveInput = {
    id?: number
    dateActivity: Date | string
    typeActivity: string
    descriptions: string
    observations?: string | null
  }

  export type ActivityCreateOrConnectWithoutBeehiveInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutBeehiveInput, ActivityUncheckedCreateWithoutBeehiveInput>
  }

  export type ActivityCreateManyBeehiveInputEnvelope = {
    data: ActivityCreateManyBeehiveInput | ActivityCreateManyBeehiveInput[]
  }

  export type ProductionHoneyCreateWithoutBeehiveInput = {
    dateCollection: Date | string
    amount: Decimal | DecimalJsLike | number | string
    quality: string
    observations?: string | null
  }

  export type ProductionHoneyUncheckedCreateWithoutBeehiveInput = {
    id?: number
    dateCollection: Date | string
    amount: Decimal | DecimalJsLike | number | string
    quality: string
    observations?: string | null
  }

  export type ProductionHoneyCreateOrConnectWithoutBeehiveInput = {
    where: ProductionHoneyWhereUniqueInput
    create: XOR<ProductionHoneyCreateWithoutBeehiveInput, ProductionHoneyUncheckedCreateWithoutBeehiveInput>
  }

  export type ProductionHoneyCreateManyBeehiveInputEnvelope = {
    data: ProductionHoneyCreateManyBeehiveInput | ProductionHoneyCreateManyBeehiveInput[]
  }

  export type TemperaturesHumidityCreateWithoutBeehiveInput = {
    dateMeasurement: Date | string
    internalTemperature: Decimal | DecimalJsLike | number | string
    externalTemperature: Decimal | DecimalJsLike | number | string
    humidityInternal: Decimal | DecimalJsLike | number | string
    humidityExternal: Decimal | DecimalJsLike | number | string
  }

  export type TemperaturesHumidityUncheckedCreateWithoutBeehiveInput = {
    id?: number
    dateMeasurement: Date | string
    internalTemperature: Decimal | DecimalJsLike | number | string
    externalTemperature: Decimal | DecimalJsLike | number | string
    humidityInternal: Decimal | DecimalJsLike | number | string
    humidityExternal: Decimal | DecimalJsLike | number | string
  }

  export type TemperaturesHumidityCreateOrConnectWithoutBeehiveInput = {
    where: TemperaturesHumidityWhereUniqueInput
    create: XOR<TemperaturesHumidityCreateWithoutBeehiveInput, TemperaturesHumidityUncheckedCreateWithoutBeehiveInput>
  }

  export type TemperaturesHumidityCreateManyBeehiveInputEnvelope = {
    data: TemperaturesHumidityCreateManyBeehiveInput | TemperaturesHumidityCreateManyBeehiveInput[]
  }

  export type FoodCreateWithoutBeehiveInput = {
    dateFeeding: Date | string
    typeFood: string
    amount: Decimal | DecimalJsLike | number | string
    observations?: string | null
  }

  export type FoodUncheckedCreateWithoutBeehiveInput = {
    id?: number
    dateFeeding: Date | string
    typeFood: string
    amount: Decimal | DecimalJsLike | number | string
    observations?: string | null
  }

  export type FoodCreateOrConnectWithoutBeehiveInput = {
    where: FoodWhereUniqueInput
    create: XOR<FoodCreateWithoutBeehiveInput, FoodUncheckedCreateWithoutBeehiveInput>
  }

  export type FoodCreateManyBeehiveInputEnvelope = {
    data: FoodCreateManyBeehiveInput | FoodCreateManyBeehiveInput[]
  }

  export type DiseaseCreateWithoutBeehiveInput = {
    dateDiagnosis: Date | string
    diseasePrague: string
    treatment: string
    observations?: string | null
  }

  export type DiseaseUncheckedCreateWithoutBeehiveInput = {
    id?: number
    dateDiagnosis: Date | string
    diseasePrague: string
    treatment: string
    observations?: string | null
  }

  export type DiseaseCreateOrConnectWithoutBeehiveInput = {
    where: DiseaseWhereUniqueInput
    create: XOR<DiseaseCreateWithoutBeehiveInput, DiseaseUncheckedCreateWithoutBeehiveInput>
  }

  export type DiseaseCreateManyBeehiveInputEnvelope = {
    data: DiseaseCreateManyBeehiveInput | DiseaseCreateManyBeehiveInput[]
  }

  export type ProducerUpsertWithoutBeehivesInput = {
    update: XOR<ProducerUpdateWithoutBeehivesInput, ProducerUncheckedUpdateWithoutBeehivesInput>
    create: XOR<ProducerCreateWithoutBeehivesInput, ProducerUncheckedCreateWithoutBeehivesInput>
    where?: ProducerWhereInput
  }

  export type ProducerUpdateToOneWithWhereWithoutBeehivesInput = {
    where?: ProducerWhereInput
    data: XOR<ProducerUpdateWithoutBeehivesInput, ProducerUncheckedUpdateWithoutBeehivesInput>
  }

  export type ProducerUpdateWithoutBeehivesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ProducerUncheckedUpdateWithoutBeehivesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cpfCnpj?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type ActivityUpsertWithWhereUniqueWithoutBeehiveInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutBeehiveInput, ActivityUncheckedUpdateWithoutBeehiveInput>
    create: XOR<ActivityCreateWithoutBeehiveInput, ActivityUncheckedCreateWithoutBeehiveInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutBeehiveInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutBeehiveInput, ActivityUncheckedUpdateWithoutBeehiveInput>
  }

  export type ActivityUpdateManyWithWhereWithoutBeehiveInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutBeehiveInput>
  }

  export type ActivityScalarWhereInput = {
    AND?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    OR?: ActivityScalarWhereInput[]
    NOT?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    id?: IntFilter<"Activity"> | number
    beehiveId?: IntFilter<"Activity"> | number
    dateActivity?: DateTimeFilter<"Activity"> | Date | string
    typeActivity?: StringFilter<"Activity"> | string
    descriptions?: StringFilter<"Activity"> | string
    observations?: StringNullableFilter<"Activity"> | string | null
  }

  export type ProductionHoneyUpsertWithWhereUniqueWithoutBeehiveInput = {
    where: ProductionHoneyWhereUniqueInput
    update: XOR<ProductionHoneyUpdateWithoutBeehiveInput, ProductionHoneyUncheckedUpdateWithoutBeehiveInput>
    create: XOR<ProductionHoneyCreateWithoutBeehiveInput, ProductionHoneyUncheckedCreateWithoutBeehiveInput>
  }

  export type ProductionHoneyUpdateWithWhereUniqueWithoutBeehiveInput = {
    where: ProductionHoneyWhereUniqueInput
    data: XOR<ProductionHoneyUpdateWithoutBeehiveInput, ProductionHoneyUncheckedUpdateWithoutBeehiveInput>
  }

  export type ProductionHoneyUpdateManyWithWhereWithoutBeehiveInput = {
    where: ProductionHoneyScalarWhereInput
    data: XOR<ProductionHoneyUpdateManyMutationInput, ProductionHoneyUncheckedUpdateManyWithoutBeehiveInput>
  }

  export type ProductionHoneyScalarWhereInput = {
    AND?: ProductionHoneyScalarWhereInput | ProductionHoneyScalarWhereInput[]
    OR?: ProductionHoneyScalarWhereInput[]
    NOT?: ProductionHoneyScalarWhereInput | ProductionHoneyScalarWhereInput[]
    id?: IntFilter<"ProductionHoney"> | number
    beehiveId?: IntFilter<"ProductionHoney"> | number
    dateCollection?: DateTimeFilter<"ProductionHoney"> | Date | string
    amount?: DecimalFilter<"ProductionHoney"> | Decimal | DecimalJsLike | number | string
    quality?: StringFilter<"ProductionHoney"> | string
    observations?: StringNullableFilter<"ProductionHoney"> | string | null
  }

  export type TemperaturesHumidityUpsertWithWhereUniqueWithoutBeehiveInput = {
    where: TemperaturesHumidityWhereUniqueInput
    update: XOR<TemperaturesHumidityUpdateWithoutBeehiveInput, TemperaturesHumidityUncheckedUpdateWithoutBeehiveInput>
    create: XOR<TemperaturesHumidityCreateWithoutBeehiveInput, TemperaturesHumidityUncheckedCreateWithoutBeehiveInput>
  }

  export type TemperaturesHumidityUpdateWithWhereUniqueWithoutBeehiveInput = {
    where: TemperaturesHumidityWhereUniqueInput
    data: XOR<TemperaturesHumidityUpdateWithoutBeehiveInput, TemperaturesHumidityUncheckedUpdateWithoutBeehiveInput>
  }

  export type TemperaturesHumidityUpdateManyWithWhereWithoutBeehiveInput = {
    where: TemperaturesHumidityScalarWhereInput
    data: XOR<TemperaturesHumidityUpdateManyMutationInput, TemperaturesHumidityUncheckedUpdateManyWithoutBeehiveInput>
  }

  export type TemperaturesHumidityScalarWhereInput = {
    AND?: TemperaturesHumidityScalarWhereInput | TemperaturesHumidityScalarWhereInput[]
    OR?: TemperaturesHumidityScalarWhereInput[]
    NOT?: TemperaturesHumidityScalarWhereInput | TemperaturesHumidityScalarWhereInput[]
    id?: IntFilter<"TemperaturesHumidity"> | number
    beehiveId?: IntFilter<"TemperaturesHumidity"> | number
    dateMeasurement?: DateTimeFilter<"TemperaturesHumidity"> | Date | string
    internalTemperature?: DecimalFilter<"TemperaturesHumidity"> | Decimal | DecimalJsLike | number | string
    externalTemperature?: DecimalFilter<"TemperaturesHumidity"> | Decimal | DecimalJsLike | number | string
    humidityInternal?: DecimalFilter<"TemperaturesHumidity"> | Decimal | DecimalJsLike | number | string
    humidityExternal?: DecimalFilter<"TemperaturesHumidity"> | Decimal | DecimalJsLike | number | string
  }

  export type FoodUpsertWithWhereUniqueWithoutBeehiveInput = {
    where: FoodWhereUniqueInput
    update: XOR<FoodUpdateWithoutBeehiveInput, FoodUncheckedUpdateWithoutBeehiveInput>
    create: XOR<FoodCreateWithoutBeehiveInput, FoodUncheckedCreateWithoutBeehiveInput>
  }

  export type FoodUpdateWithWhereUniqueWithoutBeehiveInput = {
    where: FoodWhereUniqueInput
    data: XOR<FoodUpdateWithoutBeehiveInput, FoodUncheckedUpdateWithoutBeehiveInput>
  }

  export type FoodUpdateManyWithWhereWithoutBeehiveInput = {
    where: FoodScalarWhereInput
    data: XOR<FoodUpdateManyMutationInput, FoodUncheckedUpdateManyWithoutBeehiveInput>
  }

  export type FoodScalarWhereInput = {
    AND?: FoodScalarWhereInput | FoodScalarWhereInput[]
    OR?: FoodScalarWhereInput[]
    NOT?: FoodScalarWhereInput | FoodScalarWhereInput[]
    id?: IntFilter<"Food"> | number
    beehiveId?: IntFilter<"Food"> | number
    dateFeeding?: DateTimeFilter<"Food"> | Date | string
    typeFood?: StringFilter<"Food"> | string
    amount?: DecimalFilter<"Food"> | Decimal | DecimalJsLike | number | string
    observations?: StringNullableFilter<"Food"> | string | null
  }

  export type DiseaseUpsertWithWhereUniqueWithoutBeehiveInput = {
    where: DiseaseWhereUniqueInput
    update: XOR<DiseaseUpdateWithoutBeehiveInput, DiseaseUncheckedUpdateWithoutBeehiveInput>
    create: XOR<DiseaseCreateWithoutBeehiveInput, DiseaseUncheckedCreateWithoutBeehiveInput>
  }

  export type DiseaseUpdateWithWhereUniqueWithoutBeehiveInput = {
    where: DiseaseWhereUniqueInput
    data: XOR<DiseaseUpdateWithoutBeehiveInput, DiseaseUncheckedUpdateWithoutBeehiveInput>
  }

  export type DiseaseUpdateManyWithWhereWithoutBeehiveInput = {
    where: DiseaseScalarWhereInput
    data: XOR<DiseaseUpdateManyMutationInput, DiseaseUncheckedUpdateManyWithoutBeehiveInput>
  }

  export type DiseaseScalarWhereInput = {
    AND?: DiseaseScalarWhereInput | DiseaseScalarWhereInput[]
    OR?: DiseaseScalarWhereInput[]
    NOT?: DiseaseScalarWhereInput | DiseaseScalarWhereInput[]
    id?: IntFilter<"Disease"> | number
    beehiveId?: IntFilter<"Disease"> | number
    dateDiagnosis?: DateTimeFilter<"Disease"> | Date | string
    diseasePrague?: StringFilter<"Disease"> | string
    treatment?: StringFilter<"Disease"> | string
    observations?: StringNullableFilter<"Disease"> | string | null
  }

  export type BeehiveCreateWithoutActivitiesInput = {
    name: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    typeBeehive: string
    observations?: string | null
    producer: ProducerCreateNestedOneWithoutBeehivesInput
    productionsHoney?: ProductionHoneyCreateNestedManyWithoutBeehiveInput
    temperaturesHumidities?: TemperaturesHumidityCreateNestedManyWithoutBeehiveInput
    foods?: FoodCreateNestedManyWithoutBeehiveInput
    diseases?: DiseaseCreateNestedManyWithoutBeehiveInput
  }

  export type BeehiveUncheckedCreateWithoutActivitiesInput = {
    id?: number
    producerId: number
    name: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    typeBeehive: string
    observations?: string | null
    productionsHoney?: ProductionHoneyUncheckedCreateNestedManyWithoutBeehiveInput
    temperaturesHumidities?: TemperaturesHumidityUncheckedCreateNestedManyWithoutBeehiveInput
    foods?: FoodUncheckedCreateNestedManyWithoutBeehiveInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutBeehiveInput
  }

  export type BeehiveCreateOrConnectWithoutActivitiesInput = {
    where: BeehiveWhereUniqueInput
    create: XOR<BeehiveCreateWithoutActivitiesInput, BeehiveUncheckedCreateWithoutActivitiesInput>
  }

  export type BeehiveUpsertWithoutActivitiesInput = {
    update: XOR<BeehiveUpdateWithoutActivitiesInput, BeehiveUncheckedUpdateWithoutActivitiesInput>
    create: XOR<BeehiveCreateWithoutActivitiesInput, BeehiveUncheckedCreateWithoutActivitiesInput>
    where?: BeehiveWhereInput
  }

  export type BeehiveUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: BeehiveWhereInput
    data: XOR<BeehiveUpdateWithoutActivitiesInput, BeehiveUncheckedUpdateWithoutActivitiesInput>
  }

  export type BeehiveUpdateWithoutActivitiesInput = {
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    producer?: ProducerUpdateOneRequiredWithoutBeehivesNestedInput
    productionsHoney?: ProductionHoneyUpdateManyWithoutBeehiveNestedInput
    temperaturesHumidities?: TemperaturesHumidityUpdateManyWithoutBeehiveNestedInput
    foods?: FoodUpdateManyWithoutBeehiveNestedInput
    diseases?: DiseaseUpdateManyWithoutBeehiveNestedInput
  }

  export type BeehiveUncheckedUpdateWithoutActivitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    producerId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    productionsHoney?: ProductionHoneyUncheckedUpdateManyWithoutBeehiveNestedInput
    temperaturesHumidities?: TemperaturesHumidityUncheckedUpdateManyWithoutBeehiveNestedInput
    foods?: FoodUncheckedUpdateManyWithoutBeehiveNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutBeehiveNestedInput
  }

  export type BeehiveCreateWithoutProductionsHoneyInput = {
    name: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    typeBeehive: string
    observations?: string | null
    producer: ProducerCreateNestedOneWithoutBeehivesInput
    activities?: ActivityCreateNestedManyWithoutBeehiveInput
    temperaturesHumidities?: TemperaturesHumidityCreateNestedManyWithoutBeehiveInput
    foods?: FoodCreateNestedManyWithoutBeehiveInput
    diseases?: DiseaseCreateNestedManyWithoutBeehiveInput
  }

  export type BeehiveUncheckedCreateWithoutProductionsHoneyInput = {
    id?: number
    producerId: number
    name: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    typeBeehive: string
    observations?: string | null
    activities?: ActivityUncheckedCreateNestedManyWithoutBeehiveInput
    temperaturesHumidities?: TemperaturesHumidityUncheckedCreateNestedManyWithoutBeehiveInput
    foods?: FoodUncheckedCreateNestedManyWithoutBeehiveInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutBeehiveInput
  }

  export type BeehiveCreateOrConnectWithoutProductionsHoneyInput = {
    where: BeehiveWhereUniqueInput
    create: XOR<BeehiveCreateWithoutProductionsHoneyInput, BeehiveUncheckedCreateWithoutProductionsHoneyInput>
  }

  export type BeehiveUpsertWithoutProductionsHoneyInput = {
    update: XOR<BeehiveUpdateWithoutProductionsHoneyInput, BeehiveUncheckedUpdateWithoutProductionsHoneyInput>
    create: XOR<BeehiveCreateWithoutProductionsHoneyInput, BeehiveUncheckedCreateWithoutProductionsHoneyInput>
    where?: BeehiveWhereInput
  }

  export type BeehiveUpdateToOneWithWhereWithoutProductionsHoneyInput = {
    where?: BeehiveWhereInput
    data: XOR<BeehiveUpdateWithoutProductionsHoneyInput, BeehiveUncheckedUpdateWithoutProductionsHoneyInput>
  }

  export type BeehiveUpdateWithoutProductionsHoneyInput = {
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    producer?: ProducerUpdateOneRequiredWithoutBeehivesNestedInput
    activities?: ActivityUpdateManyWithoutBeehiveNestedInput
    temperaturesHumidities?: TemperaturesHumidityUpdateManyWithoutBeehiveNestedInput
    foods?: FoodUpdateManyWithoutBeehiveNestedInput
    diseases?: DiseaseUpdateManyWithoutBeehiveNestedInput
  }

  export type BeehiveUncheckedUpdateWithoutProductionsHoneyInput = {
    id?: IntFieldUpdateOperationsInput | number
    producerId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: ActivityUncheckedUpdateManyWithoutBeehiveNestedInput
    temperaturesHumidities?: TemperaturesHumidityUncheckedUpdateManyWithoutBeehiveNestedInput
    foods?: FoodUncheckedUpdateManyWithoutBeehiveNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutBeehiveNestedInput
  }

  export type BeehiveCreateWithoutTemperaturesHumiditiesInput = {
    name: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    typeBeehive: string
    observations?: string | null
    producer: ProducerCreateNestedOneWithoutBeehivesInput
    activities?: ActivityCreateNestedManyWithoutBeehiveInput
    productionsHoney?: ProductionHoneyCreateNestedManyWithoutBeehiveInput
    foods?: FoodCreateNestedManyWithoutBeehiveInput
    diseases?: DiseaseCreateNestedManyWithoutBeehiveInput
  }

  export type BeehiveUncheckedCreateWithoutTemperaturesHumiditiesInput = {
    id?: number
    producerId: number
    name: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    typeBeehive: string
    observations?: string | null
    activities?: ActivityUncheckedCreateNestedManyWithoutBeehiveInput
    productionsHoney?: ProductionHoneyUncheckedCreateNestedManyWithoutBeehiveInput
    foods?: FoodUncheckedCreateNestedManyWithoutBeehiveInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutBeehiveInput
  }

  export type BeehiveCreateOrConnectWithoutTemperaturesHumiditiesInput = {
    where: BeehiveWhereUniqueInput
    create: XOR<BeehiveCreateWithoutTemperaturesHumiditiesInput, BeehiveUncheckedCreateWithoutTemperaturesHumiditiesInput>
  }

  export type BeehiveUpsertWithoutTemperaturesHumiditiesInput = {
    update: XOR<BeehiveUpdateWithoutTemperaturesHumiditiesInput, BeehiveUncheckedUpdateWithoutTemperaturesHumiditiesInput>
    create: XOR<BeehiveCreateWithoutTemperaturesHumiditiesInput, BeehiveUncheckedCreateWithoutTemperaturesHumiditiesInput>
    where?: BeehiveWhereInput
  }

  export type BeehiveUpdateToOneWithWhereWithoutTemperaturesHumiditiesInput = {
    where?: BeehiveWhereInput
    data: XOR<BeehiveUpdateWithoutTemperaturesHumiditiesInput, BeehiveUncheckedUpdateWithoutTemperaturesHumiditiesInput>
  }

  export type BeehiveUpdateWithoutTemperaturesHumiditiesInput = {
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    producer?: ProducerUpdateOneRequiredWithoutBeehivesNestedInput
    activities?: ActivityUpdateManyWithoutBeehiveNestedInput
    productionsHoney?: ProductionHoneyUpdateManyWithoutBeehiveNestedInput
    foods?: FoodUpdateManyWithoutBeehiveNestedInput
    diseases?: DiseaseUpdateManyWithoutBeehiveNestedInput
  }

  export type BeehiveUncheckedUpdateWithoutTemperaturesHumiditiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    producerId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: ActivityUncheckedUpdateManyWithoutBeehiveNestedInput
    productionsHoney?: ProductionHoneyUncheckedUpdateManyWithoutBeehiveNestedInput
    foods?: FoodUncheckedUpdateManyWithoutBeehiveNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutBeehiveNestedInput
  }

  export type BeehiveCreateWithoutFoodsInput = {
    name: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    typeBeehive: string
    observations?: string | null
    producer: ProducerCreateNestedOneWithoutBeehivesInput
    activities?: ActivityCreateNestedManyWithoutBeehiveInput
    productionsHoney?: ProductionHoneyCreateNestedManyWithoutBeehiveInput
    temperaturesHumidities?: TemperaturesHumidityCreateNestedManyWithoutBeehiveInput
    diseases?: DiseaseCreateNestedManyWithoutBeehiveInput
  }

  export type BeehiveUncheckedCreateWithoutFoodsInput = {
    id?: number
    producerId: number
    name: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    typeBeehive: string
    observations?: string | null
    activities?: ActivityUncheckedCreateNestedManyWithoutBeehiveInput
    productionsHoney?: ProductionHoneyUncheckedCreateNestedManyWithoutBeehiveInput
    temperaturesHumidities?: TemperaturesHumidityUncheckedCreateNestedManyWithoutBeehiveInput
    diseases?: DiseaseUncheckedCreateNestedManyWithoutBeehiveInput
  }

  export type BeehiveCreateOrConnectWithoutFoodsInput = {
    where: BeehiveWhereUniqueInput
    create: XOR<BeehiveCreateWithoutFoodsInput, BeehiveUncheckedCreateWithoutFoodsInput>
  }

  export type BeehiveUpsertWithoutFoodsInput = {
    update: XOR<BeehiveUpdateWithoutFoodsInput, BeehiveUncheckedUpdateWithoutFoodsInput>
    create: XOR<BeehiveCreateWithoutFoodsInput, BeehiveUncheckedCreateWithoutFoodsInput>
    where?: BeehiveWhereInput
  }

  export type BeehiveUpdateToOneWithWhereWithoutFoodsInput = {
    where?: BeehiveWhereInput
    data: XOR<BeehiveUpdateWithoutFoodsInput, BeehiveUncheckedUpdateWithoutFoodsInput>
  }

  export type BeehiveUpdateWithoutFoodsInput = {
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    producer?: ProducerUpdateOneRequiredWithoutBeehivesNestedInput
    activities?: ActivityUpdateManyWithoutBeehiveNestedInput
    productionsHoney?: ProductionHoneyUpdateManyWithoutBeehiveNestedInput
    temperaturesHumidities?: TemperaturesHumidityUpdateManyWithoutBeehiveNestedInput
    diseases?: DiseaseUpdateManyWithoutBeehiveNestedInput
  }

  export type BeehiveUncheckedUpdateWithoutFoodsInput = {
    id?: IntFieldUpdateOperationsInput | number
    producerId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: ActivityUncheckedUpdateManyWithoutBeehiveNestedInput
    productionsHoney?: ProductionHoneyUncheckedUpdateManyWithoutBeehiveNestedInput
    temperaturesHumidities?: TemperaturesHumidityUncheckedUpdateManyWithoutBeehiveNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutBeehiveNestedInput
  }

  export type BeehiveCreateWithoutDiseasesInput = {
    name: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    typeBeehive: string
    observations?: string | null
    producer: ProducerCreateNestedOneWithoutBeehivesInput
    activities?: ActivityCreateNestedManyWithoutBeehiveInput
    productionsHoney?: ProductionHoneyCreateNestedManyWithoutBeehiveInput
    temperaturesHumidities?: TemperaturesHumidityCreateNestedManyWithoutBeehiveInput
    foods?: FoodCreateNestedManyWithoutBeehiveInput
  }

  export type BeehiveUncheckedCreateWithoutDiseasesInput = {
    id?: number
    producerId: number
    name: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    typeBeehive: string
    observations?: string | null
    activities?: ActivityUncheckedCreateNestedManyWithoutBeehiveInput
    productionsHoney?: ProductionHoneyUncheckedCreateNestedManyWithoutBeehiveInput
    temperaturesHumidities?: TemperaturesHumidityUncheckedCreateNestedManyWithoutBeehiveInput
    foods?: FoodUncheckedCreateNestedManyWithoutBeehiveInput
  }

  export type BeehiveCreateOrConnectWithoutDiseasesInput = {
    where: BeehiveWhereUniqueInput
    create: XOR<BeehiveCreateWithoutDiseasesInput, BeehiveUncheckedCreateWithoutDiseasesInput>
  }

  export type BeehiveUpsertWithoutDiseasesInput = {
    update: XOR<BeehiveUpdateWithoutDiseasesInput, BeehiveUncheckedUpdateWithoutDiseasesInput>
    create: XOR<BeehiveCreateWithoutDiseasesInput, BeehiveUncheckedCreateWithoutDiseasesInput>
    where?: BeehiveWhereInput
  }

  export type BeehiveUpdateToOneWithWhereWithoutDiseasesInput = {
    where?: BeehiveWhereInput
    data: XOR<BeehiveUpdateWithoutDiseasesInput, BeehiveUncheckedUpdateWithoutDiseasesInput>
  }

  export type BeehiveUpdateWithoutDiseasesInput = {
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    producer?: ProducerUpdateOneRequiredWithoutBeehivesNestedInput
    activities?: ActivityUpdateManyWithoutBeehiveNestedInput
    productionsHoney?: ProductionHoneyUpdateManyWithoutBeehiveNestedInput
    temperaturesHumidities?: TemperaturesHumidityUpdateManyWithoutBeehiveNestedInput
    foods?: FoodUpdateManyWithoutBeehiveNestedInput
  }

  export type BeehiveUncheckedUpdateWithoutDiseasesInput = {
    id?: IntFieldUpdateOperationsInput | number
    producerId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: ActivityUncheckedUpdateManyWithoutBeehiveNestedInput
    productionsHoney?: ProductionHoneyUncheckedUpdateManyWithoutBeehiveNestedInput
    temperaturesHumidities?: TemperaturesHumidityUncheckedUpdateManyWithoutBeehiveNestedInput
    foods?: FoodUncheckedUpdateManyWithoutBeehiveNestedInput
  }

  export type BeehiveCreateManyProducerInput = {
    id?: number
    name: string
    longitude: number
    latitude: number
    startDate: Date | string
    status: string
    typeBeehive: string
    observations?: string | null
  }

  export type BeehiveUpdateWithoutProducerInput = {
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: ActivityUpdateManyWithoutBeehiveNestedInput
    productionsHoney?: ProductionHoneyUpdateManyWithoutBeehiveNestedInput
    temperaturesHumidities?: TemperaturesHumidityUpdateManyWithoutBeehiveNestedInput
    foods?: FoodUpdateManyWithoutBeehiveNestedInput
    diseases?: DiseaseUpdateManyWithoutBeehiveNestedInput
  }

  export type BeehiveUncheckedUpdateWithoutProducerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: ActivityUncheckedUpdateManyWithoutBeehiveNestedInput
    productionsHoney?: ProductionHoneyUncheckedUpdateManyWithoutBeehiveNestedInput
    temperaturesHumidities?: TemperaturesHumidityUncheckedUpdateManyWithoutBeehiveNestedInput
    foods?: FoodUncheckedUpdateManyWithoutBeehiveNestedInput
    diseases?: DiseaseUncheckedUpdateManyWithoutBeehiveNestedInput
  }

  export type BeehiveUncheckedUpdateManyWithoutProducerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    longitude?: FloatFieldUpdateOperationsInput | number
    latitude?: FloatFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    typeBeehive?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityCreateManyBeehiveInput = {
    id?: number
    dateActivity: Date | string
    typeActivity: string
    descriptions: string
    observations?: string | null
  }

  export type ProductionHoneyCreateManyBeehiveInput = {
    id?: number
    dateCollection: Date | string
    amount: Decimal | DecimalJsLike | number | string
    quality: string
    observations?: string | null
  }

  export type TemperaturesHumidityCreateManyBeehiveInput = {
    id?: number
    dateMeasurement: Date | string
    internalTemperature: Decimal | DecimalJsLike | number | string
    externalTemperature: Decimal | DecimalJsLike | number | string
    humidityInternal: Decimal | DecimalJsLike | number | string
    humidityExternal: Decimal | DecimalJsLike | number | string
  }

  export type FoodCreateManyBeehiveInput = {
    id?: number
    dateFeeding: Date | string
    typeFood: string
    amount: Decimal | DecimalJsLike | number | string
    observations?: string | null
  }

  export type DiseaseCreateManyBeehiveInput = {
    id?: number
    dateDiagnosis: Date | string
    diseasePrague: string
    treatment: string
    observations?: string | null
  }

  export type ActivityUpdateWithoutBeehiveInput = {
    dateActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    typeActivity?: StringFieldUpdateOperationsInput | string
    descriptions?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityUncheckedUpdateWithoutBeehiveInput = {
    id?: IntFieldUpdateOperationsInput | number
    dateActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    typeActivity?: StringFieldUpdateOperationsInput | string
    descriptions?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityUncheckedUpdateManyWithoutBeehiveInput = {
    id?: IntFieldUpdateOperationsInput | number
    dateActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    typeActivity?: StringFieldUpdateOperationsInput | string
    descriptions?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductionHoneyUpdateWithoutBeehiveInput = {
    dateCollection?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quality?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductionHoneyUncheckedUpdateWithoutBeehiveInput = {
    id?: IntFieldUpdateOperationsInput | number
    dateCollection?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quality?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductionHoneyUncheckedUpdateManyWithoutBeehiveInput = {
    id?: IntFieldUpdateOperationsInput | number
    dateCollection?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quality?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TemperaturesHumidityUpdateWithoutBeehiveInput = {
    dateMeasurement?: DateTimeFieldUpdateOperationsInput | Date | string
    internalTemperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    externalTemperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    humidityInternal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    humidityExternal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TemperaturesHumidityUncheckedUpdateWithoutBeehiveInput = {
    id?: IntFieldUpdateOperationsInput | number
    dateMeasurement?: DateTimeFieldUpdateOperationsInput | Date | string
    internalTemperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    externalTemperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    humidityInternal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    humidityExternal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type TemperaturesHumidityUncheckedUpdateManyWithoutBeehiveInput = {
    id?: IntFieldUpdateOperationsInput | number
    dateMeasurement?: DateTimeFieldUpdateOperationsInput | Date | string
    internalTemperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    externalTemperature?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    humidityInternal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    humidityExternal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
  }

  export type FoodUpdateWithoutBeehiveInput = {
    dateFeeding?: DateTimeFieldUpdateOperationsInput | Date | string
    typeFood?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FoodUncheckedUpdateWithoutBeehiveInput = {
    id?: IntFieldUpdateOperationsInput | number
    dateFeeding?: DateTimeFieldUpdateOperationsInput | Date | string
    typeFood?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FoodUncheckedUpdateManyWithoutBeehiveInput = {
    id?: IntFieldUpdateOperationsInput | number
    dateFeeding?: DateTimeFieldUpdateOperationsInput | Date | string
    typeFood?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DiseaseUpdateWithoutBeehiveInput = {
    dateDiagnosis?: DateTimeFieldUpdateOperationsInput | Date | string
    diseasePrague?: StringFieldUpdateOperationsInput | string
    treatment?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DiseaseUncheckedUpdateWithoutBeehiveInput = {
    id?: IntFieldUpdateOperationsInput | number
    dateDiagnosis?: DateTimeFieldUpdateOperationsInput | Date | string
    diseasePrague?: StringFieldUpdateOperationsInput | string
    treatment?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DiseaseUncheckedUpdateManyWithoutBeehiveInput = {
    id?: IntFieldUpdateOperationsInput | number
    dateDiagnosis?: DateTimeFieldUpdateOperationsInput | Date | string
    diseasePrague?: StringFieldUpdateOperationsInput | string
    treatment?: StringFieldUpdateOperationsInput | string
    observations?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}