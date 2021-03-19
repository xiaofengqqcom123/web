​## ELK
 ELK是Elasticsearch、Logstash、Kibana三大开源框架的首字母简称，业内也称为Elastic Stack。其中Elasticsearch是一个基于Lucene作为底层引擎实现的分布式近实时搜索框架，简称ES。Logstash是ELK的中央数据流引擎，用于从不同数据源（文件/数据存储/消息队列等）收集多种格式的数据，经过过滤增强后输出到不同目的介质中（ES/文件/消息队列/redis等）。Kibana可以将ElasticSearch的数据通过友好的页面展示出来，提供实时分析的功能。

 ## Elasticsearch
 Elasticsearch 是一款基于 Lucene 开源的搜索引擎(这里强调一下是搜索引擎，NoSQL是它的附带功能不是它的强项)和数据分析引擎。从名字中即可知道，除了search还有重要的一点是elastic，即具有良好的水平扩展能力，能够快速地储存、近实时地搜索和分析海量数据。

这个世界已然被数据淹没，原始数据如果只是躺在磁盘里面根本就毫无用处。Elasticsearch 能从项目一开始就赋予数据以搜索、分析和探索的能力。

Elasticsearch 不仅仅只是全文搜索，还能实现结构化搜索、数据分析、复杂的语言处理、地理位置和对象间关联关系等。无论你是需要全文搜索，还是结构化数据的实时统计，或者两者结合，都能通过简单易用的RESTful API与Elasticsearch交互。

## 概念
虽然对于用户来说，Elasticsearch（下面简称 ES）的概念并不是必须要了解的，但了解这些有助于更好地使用 ES。

**Cluster/Node 集群和节点**
多个 ES 实例组成一个Cluster 集群，实现了分布式的特性。

每一个运行实例称为一个 Node 节点，每一个运行实例既可以在同一机器上（一机多实例），也可以在不同的机器上。

**Index 索引**
Index 索引是 ES 中相似数据的集合，一份 Index 中可以有多个 Doc 文档，一个 Doc 中可存在多个 Field 字段，不同的 Field 可设置不同的 Mappings 映射，即数据类型。下面用 MySQL 作为类比便于理解：

Elasticsearch	Index	Type*	Doc	Field
MySQL	Database	Table	Row	Column
Type是个不合理的设计，ES6.x中一个 Index 中只能有一个 Type，ES7.x开始正式弃用

**Shards/Replicas 分片和副本**
分片是为了解决分布式存储大规模数据的问题，将 Index 中的数据切成若干个分片，存储到不同的 Data Node 上。

副本是主分片的拷贝，通常存储在与主分片不同的节点上，实现高可用，并在一定程度上提高搜索吞吐量。

**Document 文档**
Index 中的一条数据/记录被称为一份 Document 文档，是一个可被索引（动词）的基础信息单元。文档以JSON格式来表示。

**Field/Mapping 字段和映射**
一份文档中可以有多个字段，和其他非关系型数据库类似，以 k/v 结构的 JSON 格式存储。一个字段对应着一种映射，即数据的类型。多数情况下一个字段的Mapping一旦确定就无法更改。