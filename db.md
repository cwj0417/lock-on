## collections

### words

| field          | content | structrue                |
| -------------- | ------- | ------------------------ |
| word           | 单词或词组   | string                   |
| definition     | 单词的意思   | string                   |
| rank           | 单词等级    | 枚举[1, 2, 3, 4, 5], 越高越重要 |
| recognized     | 是否已背出   | 布尔值                      |
| createTime     | 单词创建时间  | Date, 自动产生               |
| sourceUrl      | 来源url   | 可选, string, url          |
| sourceSentence | 来源句子    | 可选, string               |
| finded | 曝光率    | Number, 被查到自动+1              |

