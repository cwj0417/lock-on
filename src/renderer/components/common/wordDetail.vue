<style lang="scss">
    .wordDetail {
        width: 100%;
        padding: 20px;
        .wordstar {
            .word {
                font-size: 25px;
                font-weight: bold;
                line-height: 30px;
                float: left;
            }
        }
        .defoperate {
            margin-top: 10px;
            font-size: 15px;
            line-height: 17px;
            padding: 5px;
            .definition {
                height: 34px;
                overflow: auto;
                width: calc(100% - 100px);
                float: left;
            }
            .operation {
                float: right;
                i {
                    padding: 3px;
                }
            }
        }
        .sentence {
            padding: 5px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 15px;
            border-top: 1px solid var(--txt);
            height: 120px;
            .url {
                cursor: pointer;
                padding: 10px;
                text-decoration: underline;
                display: inline-block;
            }
        }
    }
</style>
<template>
    <div class="wordDetail" v-if="word">
        <div class="wordstar clearfix">
            <div class="word">
                <span>{{word.word}}</span>
                <i class="fa fa-check-square-o" style="padding-left: 15px; font-size: 15px; color: var(--minor);"></i>
            </div>
            <Rate class="pull-right" disabled v-model="word.rank"></Rate>
        </div>
        <div class="defoperate clearfix">
            <div class="definition">
                <span>{{word.definition}}</span>
            </div>
            <div class="operation">
                <i class="fa fa-plus-circle"></i>
                <i class="fa fa-edit"></i>
                <i class="fa fa-trash"></i>
            </div>
        </div>
        <div class="sentence">
            <span>{{word.sourceSentence}}</span>
        </div>
        <div class="footer">
            <span class="url" @click="$electron.shell.openExternal(word.sourceUrl)">{{word.sourceUrl}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['word']
    }
</script>
