declare const __brand: unique symbol;
export type Brand<B> = {
    [__brand]: B;
};
export type Branded<T, B> = T & Brand<B>;
export {};
