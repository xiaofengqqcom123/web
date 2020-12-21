### 设计目标
- 如何高效存储多个版本
  - 相同的文件：不重复存储
  - 相似的文件：增量存储
- 机器间如何高效传输
  - 相同的文件：不传输
  - 相似的文件：增量传输

### Git Objects
  - Content-addressable Filesystem
  - store = type + ' ' + len(content) + '\0' + content
    - type: commit, tree, blob, tag
  - objectAddress = sha1(store)
- 查看object的命令：git cat-file -p objectAddress
- 自动实现了object去重
  - 忽略hash碰撞，sha1碰撞概率极低，支持迁移到sha256
- Merkle DAG（Merkle Tree）

```
rujunqiao@rujunqiaodeMacBook-Pro:~/Desktop/work/data-workshop/.git/objects (GIT_DIR!)$ git cat-file -t ae6d1140e9911a1ed9cd35a679ed568166da9bad
commit
rujunqiao@rujunqiaodeMacBook-Pro:~/Desktop/work/data-workshop/.git/objects (GIT_DIR!)$ git cat-file -t prod-20190628
tag
rujunqiao@rujunqiaodeMacBook-Pro:~/Desktop/work/data-workshop/.git/objects (GIT_DIR!)$ git cat-file -s prod-20190628
139
rujunqiao@rujunqiaodeMacBook-Pro:~/Desktop/work/data-workshop/.git/objects (GIT_DIR!)$ git cat-file -p prod-20190628
object e57db073b033a06cffae9915945d96ee0b4f3b65
type commit
tag prod-20190628
tagger 晓红 <xiaohong@xiaomi.com> 1561716722 +0800
```
<img src="./assets/Merkle.png">

### How Git Stores Objects
- Loose Objects
  - objects/ab/04d884140f7b0cf8bbf86d6883869f16a46f65
- Packed Objects
  - objects/pack/
    - pack-474ad2c527e0e95c8733435283180720af7b5069.pack
    - pack-474ad2c527e0e95c8733435283180720af7b5069.idx
    - pack-474ad2c527e0e95c8733435283180720af7b5069.bitmap

#### Loose Objects
```
 def putLooseObject(content, type):
    data = b'%s %d\0%s' % (type, len(content), content)
    sha1 = hashlib.sha1(data).hexdigest()
    path = f'{gitDir}/objects/{sha1[0:2]}/{sha1[2:40]}'
    if not os.path.exists(path):
     os.makedirs(os.path.dirname(path), exist_ok=True)
     open(path, 'wb').write(deflate(data))
    return sha1
```

#### The Packfile Format
- Object header
  - type (3bits)
    - OBJ_COMMIT (1)
    - OBJ_TREE (2)
    - OBJ_BLOB (3)
    - OBJ_TAG (4)
    - OBJ_OFS_DELTA (6)
    - OBJ_REF_DELTA (7)
  - size: 解压后的大小，变长编码
  <img src="./assets/pack.png">
