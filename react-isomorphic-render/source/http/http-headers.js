import React from 'react';
import HttpHeader from './HttpHeader';

export function httpHeader(name, value) {
  return <HttpHeader name={name} value={value} />;
}

export function serverGeneratedHttpHeaders() {
  return HttpHeader.rewind();
}
