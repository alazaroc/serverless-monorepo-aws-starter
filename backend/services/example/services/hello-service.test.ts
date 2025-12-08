import { hello } from './hello-service';

test('hello returns greeting', () => {
  expect(hello('Alejandro')).toBe(
    'Hello Alejandro from the serverless monorepo backend!'
  );
});
