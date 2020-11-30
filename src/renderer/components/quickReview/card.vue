<template>
    <div class="quick-view-card ani-block-in">
        <div class="wrap">
            <div class="card-head">
                <input @click.stop="" type="text" :value="word.word"
                       @input="mod({word, field: 'word', value: $event.target.value})">
            </div>
            <div class="card-rate">
                <img src="../../assets/image/nav_like.png" alt="" style="width: 16px;"
                     v-if="word.like"
                     @click.stop="mod({word, field: 'like', value: !word.like})">
                <img src="../../assets/image/unlike.png" alt="" style="width: 16px;"
                     v-else
                     @click.stop="mod({word, field: 'like', value: !word.like})">
                <Rate :value="word.rank" @input="setRank"></Rate>
            </div>
            <div class="card-def">
                <textarea rows="3" :value="word.definition"
                          @input="mod({word, field: 'definition', value: $event.target.value})"/>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    export default {
        props: ['word'],
        methods: {
            ...mapActions({
                mod: 'words/update'
            }),
            setRank (value) {
                this.mod({word: this.word, field: 'rank', value})
            }
        }
    }
</script>
<style lang="scss">
    .quick-view-card {
        width: 268px;
        height: 189px;
        .wrap {
            background: #fff;
            width: 248px;
            height: 169px;
            box-shadow: 0 0 8px rgba(234, 234, 234, .5);
            margin: 20px 0 0 20px;
            border-radius: 10px;
            input, textarea {
                border-radius: 8px;
                background: rgba(250,250,252,1);
                width: 100%;
            }
            .card-head {
                height: 50px;
                padding: 16px 20px 12px 20px;
                font-size: 16px;
                line-height: 22px;
                input {
                    text-indent: 10px;
                }
            }
            .card-rate {
                height: 40px;
                padding: 10px 20px 11px 20px;
                display: flex;
                align-items: center;
                .ivu-rate {
                    font-size: 0;
                    margin-left: 10px;
                    .ivu-rate-star {
                        width: 12px;
                        font-size: 12px;
                        margin-right: 5px;
                    }
                }
            }
            .card-def {
                padding: 0 20px;
                textarea {
                    padding: 10px;
                    resize: none;
                }
            }
        }
        &:last-child {
            width: 288px;
        }
    }
</style>
