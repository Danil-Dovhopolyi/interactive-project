import { ComponentType } from 'react';

export interface IRoute {
  key: string;
  title: string;
  path: string;
  component: ComponentType;
}
export interface TransactionInput {
  prev_out: {
    addr: string;
    value: number;
  };
}

export interface TransactionOutput {
  addr: string;
  value: number;
}

export interface Transaction {
  hash: string;
  inputs: TransactionInput[];
  out: TransactionOutput[];
}

export interface RawTransactionInput {
  prev_out: {
    addr: string;
    value: number;
  };
}

export interface RawTransactionOutput {
  addr: string;
  value: number;
}

export interface RawTransactionData {
  x: {
    hash: string;
    inputs: RawTransactionInput[];
    out: RawTransactionOutput[];
  };
  op: string;
}
