大数据：一种规模大到在获取、存储、管理、分析方面大大超出了传统数据库软件工具能力范围的数据集合，具有海量的数据规模、快速的数据流转、多样的数据类型和价值密度低四大特征。
# Google 三架马车
Google发布的三篇关于大数据套件的论文，包含了大数据的**文件系统、分布式数据库、计算**三个方向的能力。分别对应的是**GFS、BigTable、MapReduce**。
> 论文地址
> - [Google File System](https://static.googleusercontent.com/media/research.google.com/zh-CN//archive/gfs-sosp2003.pdf)
> - [MapReduce](https://static.googleusercontent.com/media/research.google.com/zh-CN//archive/mapreduce-osdi04.pdf)
> [BigTable](https://static.googleusercontent.com/media/research.google.com/zh-CN//archive/bigtable-osdi06.pdf)

## GFS(HDFS)
> HDFS是GFS的开源实现，GFS是Google论文提到的文件存储系统

<img src="./assets/gfs.png">

HDFS是Hadoop分布式文件系统，具有高容错性、高伸缩性，允许用户基于廉价硬件部署，构建分布式存储系统，为分布式计算存储提供了底层支持。上图是HDFS的架构。

**概念**: 
- **数据块**:  抽象块而非整个文件作为存储单元；其默认大小为 64MB，不过在实际应用中，一般设置为 128MB ，备份X3
- **NameNode**:  管理文件系统的命名空间，文件元数据；维护着文件系统的所有文件和目录，文件与数块的映射；记录每个文件中各个块所在数据节点的信息
- **DataNode**: 存储并检索数据块；向NameNode更新所存储块的列表

**特点**
- 普通的成百上千的机器
- 按TB甚至Pb为单位的大量的数据
- 简单编辑的文件获取

**优点**
- 适合大文件存储，支持TB、PB级别的数存储，并有副本策略
- 可以构建在廉价的机器上，并有一定的容错和恢复机制
- 支持流式数据访问，一次写入，多次读取最高效

**缺点**
- 不合适小量小文件存储
- 不适合并发写入，不支持文件随机修改
- 不支持随机读低延时的访问方式

**写流程**
![](https://user-gold-cdn.xitu.io/2020/3/23/171070e6a06746ab?w=866&h=534&f=png&s=221971)
1. 客户端向NameNode发起写请求
2. 分块写入DataNode节点，DataNode自动完成副本备份
3. DataNode向NameNode汇报存储完成，NameNode通知客户端

**读流程**
![](https://user-gold-cdn.xitu.io/2020/3/23/1710712b01effbc8?w=1896&h=1084&f=png&s=727310)
1. 客户端向NameNode发起读数据请求
2. NameNode找出距离最近的DataNode节点信息
3. 客户端从DataNode分块下载文件

**简单使用**
1. shell脚本
```
常见HDFS Shell命令
- 类linux命令：ls、cat、mkdir、rm、chmod、chown等
- HDFS文件交互：copyFromLocal、copyToLocal、get、put等
帮助命令：./hdfs dfs -help
```

**实践**
1. 概念
- namespace: Basically when we say Namespace we mean a certain location on the hdfs.In Hadoop we refer to a Namespace as a file or directory which is handled by the Name Node
##  MapReduce
<img src="./assets/mapreduce.png">

MapReduce的原理十分简单，就是分而治之，就是算法中的分治法。可以发现现在很多先进的技术都是很早之前就有的技术重新发光发热（例如密码学->区块链、容器技术->k8s、机器学习算法->AI等）
而MapReduce在之前能引起轩然大波的原因也有很大的时代背景：

1. 当时大数据处理的概念已经出现，但不成熟，大家都有自己的一套方式。
2. Google发布的MapReduce相当于给出了一套标准处理方案，同时对整个流程有很好的抽象，适应场景十分多。
3. Google不止给出了MapReduce同时还配合了GFS和BigTable这两个配套的大数据套件。
4. MapReduce让一堆闲置垃圾机器用了用武之地。

MapReduce的几个步骤：**Input, Split, Map, Shuffle, Reduce, Finalize**

<img src="./assets/map-step.png">

整体思想看起来是很简单的，但是MapReduce实际操作起来还是比较复杂的。以至于到现在基本已经淘汰，它主要有以下几个比较致命的缺点：

1. 执行效率慢
   1. 从磁盘读取文件分片计算，所以需要频繁的磁盘读写。
   2. Map和Reduce操作之间的依赖比较深，经常很多个map执行完毕了，还需要等待最后一个Map执行完才能执行Reduce。
2. 代码编写复杂
   1. 一个简单的任务都要编写比较多的Java代码。
   2. 因为执行效率不佳所以他需要通过代码来优化性能，而优化性能的小册子有500多页，Google曾经用5年把一个2小时的MR代码优化到了0.5小时-0-

所谓有缺点才有进步的空间，因为这些问题，后续大数据诞生了非常多耳熟能详的的明星框架来解决问题(Hive、Presto、Spark等）。下面我们会一一提到。

## BigTable（HBase)
<img src="./assets/hbase.png">

实现了数据的分布式存储、行数据的事务性管理和较好的扩展性，从存储WEB页面而生，创造性提出了KEY-VALUE这种MAP数据结构。

高可靠，高性能，面向列，可伸缩，实时读写的”分布式数据库“<br/>
利用HDFS作为其文件存储系统，支持MR程序读取数据<br/>
存储非结构化和半结构化数据

- RowKey：数据唯一标识，按字典排序
- Column Family: 列族，多个列的集合，最多不要超过3个
- TimeStamp时间戳：支持多版本数据同时存在


# Hadoop 1.0
> Hapoop是HDFS的作者加入雅虎后开源的一套大数据开源框架，是基于Google的三个系统的开源实现，并扩展了很多相关能力，成为了当时大数据开发的标配能力。
<img src="./assets/hadoop1.0.png">

1.0的构成很简单，就是HDFS存储数据+MapReduce计算数据。在这里MapReduce还承担了资源管理的作用-Job Tracker，跟踪执行计划以及对应资源分配。

而这个架构也存在着一些问题：
- **扩展性差**
JobTracker既要做资源管理，又要做任务监控，job的最大并发数受限制。
- **可用性差**
JobTracker存在单点故障问题
- **资源利用率低**
Map Slot和Reduce Slot的设计无法分享，造成资源浪费
- **无法支持更多计算模型**
只能进行MapReduce计算模型，无法调度流式计算、迭代计算、DAG计算等模型。

# Hadoop 2.0
于是Hadoop2.0就把JobTracker抽出来（抽象分层，计算机通用技巧）重新做了个叫Yarn的框架。由Yarn来负责资源的统一分配，这样一拆一个是能力独立化，另外还有一个重大的意义就是，上层计算框架可以支持扩展了，并不一定要是MapReduce。

Hadoop2.0后，资源管理器，所有的mapReduce程序都需要通过yarn来调度，下面理解下其概念
- ResourceManager: 分配和调度资源；启动并监控ApplicationMaster；监控NodeManager
- ApplicationMaster：为MR类型的程序申请资源，并分配给内部任务；负责数据的切分；监控任务的执行及容错；
- NodeManager: 管理单个节点的资源；处理来着ResourceManager的命令；处理来自ApplicationMaster的命令


<img src="./assets/hadoop2.0.png">

可以看出Hapoop2.0的生态变得十分丰富，这时候才算真正的形成了大数据处理套件。这里讲下Hive这个角色，我们如果在公司进行大数据开发，Hive会接触比较多。

**Hive**

Hive严格的说不算是数据库，而是一个数据库管理工具，但他对于整个大数据的发展有着很重要的意义：
- Hive把数据库（一般使用HDFS）的文件映射为传统数据库的库表形式，在上层可以更方便的管理库表的元数据。
- Hive一个大创新是通过类SQL（HSQL）来分析大数据，而避免了写MapReduce程序来分析数据。
  - 这基本奠定了后续各种引擎的计算层实现方式，例如Spark和Flink等也都是用SQL来分析数据。当然他们底层都是有个解释器来把SQL解析成对应的执行编码（Java，Scala）。
  - 特别复杂的语句和数据还是要手写MR实现，后面的Spark、Flink也是类似。
- 基于Hadoop生态的完整性，以及MR的劣势，Hive也支持使用其他引擎（Spark、Presto）来进行对应的数据分析。
- 支持UDF开发。
但是Hadoop2.0发展着便遇到了上述提到的MapReduce的另一个缺点：数据量大了之后越来越慢。所以出现了Presto、Spark。

**HBase**：列式数据库

**Spark**：基于内存分布式计算框架

**Sqoop**: 传统数据库和Hadoop  之间导入导出的工具

**Ambari**：Hadoop集群管理部署框架

# Presto、Spark
## Presto
FaceBook于2013年11月份开源了Presto，一个出内存分布式SQL查询引擎，它被设计为用来专门进行高速、实时的数 据分析。它支持标准的ANSI SQL，包括复杂查询、聚合（aggregation）、连接（join）和窗口函数（window functions)。Presto设计了一个简单的数据存储的抽象层，来满足在不同数据存储系统（包括HBase、HDFS、Scribe等）之上都可 以使用SQL进行查询。

|特点|描述|
| ---- | ---- |
|数据源|支持MySQL/PostgreSQL/Cassandra/Hive/Kafka等|
|SQL支持|完全支持ANSI SQL，提供SQL Shell，也支持JDBC/ODBC|
|扩展性|connector机制，很容易扩展开发自定义connector对接特定数据源|
|混合计算|针对一种类型的connector配置一个或多个catalog，支持混合多个catalog进行join查询计算|
|高性能|充分利用内存，平均性能是Hive的10倍以上，秒级/毫秒级响应|
|流水线|Pipeline设计，数据像自来水管道一样，一旦开始计算，数据就立即产生呈现到终端直到结束|

<img src="./assets/presto.png">

Presto快的因素在于使用了纯内存的计算方式以及MMP的架构

### MMP架构
Presto采用了跟MR不一样的计算引擎-Multimedia Processor(MMP,海量并行计算架构，基于Shard nothing）。
从上述可以看到MapReduce和MMP的执行很像，都是把任务拆分到不同的机器上去执行，但是MR的Map和Reduce是有依赖关系的，并行的时候，需要去检查Map是否执行完毕才能执行Reduce的任务。
但是MMP不是，他是把所有子任务根据sql的一些对应关系拆分好，分到各个子节点执行，可以所有任务并发执行，最后再由leader节点汇总。
但是任何事情都有两面性，因为基于内存，所以Presto如果内存不够用了会经常OOM（Out Of Memory），而因为任务执行都是并发的，所以稳定性比较差，出了问题也比较难以排查。
## Spark
基于内存计算的分布式计算框架<br/>
抽象出分布式内存存储数据结构 弹性分布式数据集RDD<br/>
基于时间驱动，通过线程池提高性能



### 核心
- HDFS分布式文件系统：存储是大数据技术的基础
- MapReduce编程模型：分布式计算是大数据应用的解决方案