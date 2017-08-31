import React from 'react';
import HttpStatus from './HttpStatus';

export function httpStatus(code) {
  return <HttpStatus code={code} />;
}

export function serverGeneratedHttpStatus() {
  return HttpStatus.rewind();
}
