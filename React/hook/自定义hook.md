## 常用自定义hook
### 1. usePrevious
```
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

### 2. 执行顺序
```
\\ 自定义 hook， useTest
export const useTest = () => {
  const [a, setA] = useState("初始 a");

  useEffect(() => {
    setA("更改后的 a");
  }, []);

  return a;
};

function App() {
  const a = useTest();
  console.log("test", a);

  const b = useMemo(() => {
    return "gagag";
  }, []);

  console.log("memo", b);
}

// 输出结果：初始 a => gagag => 
```