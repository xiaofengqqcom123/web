下面讲一下 react suspense 是如何使用的. 
- [React demo](https://stackblitz.com/edit/react-ts-idn27p?file=index.tsx,fakeApi.ts)
- [How does react Suspense work? video](https://www.google.com/search?q=how+react+suspense&oq=how+react+suspense&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDzSAQkxMTgzOWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#fpstate=ive&vld=cid:1e01ad1b,vid:8YQXeqgSSeM)

utils 
```
function wrapPromise(promise) {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
}

```

业务使用
```
---- index.js ----
import { Suspense } from 'react';
import MyComponent from './MyComponent';

function App() {
    return (
        <Suspense fallback={<p>loading ...</p>}>
            <MyCompoennt>
        <Suspense>
    )
}

----- MyComponent.js ----
funciton getPeople () {
    return fetch('xxx')
}

const peoplePromise = wrapPromise(getPeople())
function MyComponent() {

    const people = peoplePromise.read()
    return (    
        <>
            {people.map(item => 
                <div>{item}</div>
            )}
        </>
    )
}
```
