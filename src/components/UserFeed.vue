<template>
  <div class="feed">
    <div>
      <form v-on:submit.prevent="makeClass" class="classForm">
	<input type="text" v-model="classText" placeholder="Class Name"/>
  <input type="text" v-model="profText" placeholder="Professor Name"/><br/>
	<div class="buttonWrap">
	  <button class="primary" type="submit">Add class</button>
	</div>
      </form>
    </div>
    <div v-for="item in feed" class="item">
      <p class="idline"><span class="user">{{item.name}}</span><span class="handle">@{{item.username}}</span><span class="time">{{item.created | since}}</span></p>
      <p class="className">{{item.className}}</p>
      <p class="profName">{{item.profName}}</p>
    </div>
  </div>
</template>

<script>
 import moment from 'moment';
 export default {
   name: 'UserFeed',
   data () {
     return {
       classText: '',
       profText: '',
     }
   },
   created: function() {
     this.$store.dispatch('getFeed');
   },
   filters: {
     since: function(datetime) {
       moment.locale('en', {
	 relativeTime: {
	   future: 'in %s',
	   past: '%s',
	   s:  'seconds',
	   ss: '%ss',
	   m:  '1m',
	   mm: '%dm',
	   h:  'h',
	   hh: '%dh',
	   d:  'd',
	   dd: '%dd',
	   M:  ' month',
	   MM: '%dM',
	   y:  'a year',
	   yy: '%dY'
	 }
       });
       return moment(datetime).fromNow();
     },
   },
   computed: {
     feed: function() {
       return this.$store.getters.feed;
     },
   },
   methods: {
     makeClass: function() {
       this.$store.dispatch('addClass',{
         className: this.className,
         profName: this.profName,
       }).then(className => {
	 this.text = "";
       });
     },
   }
 }
</script>

<style scoped>
 .feed {
     width: 600px;
 }
 .classForm {
     background: #eee;
     padding: 10px;
     margin-bottom: 10px;
 }
 .buttonWrap {
     width: 100%;
     display: flex;
 }
 button {
     margin-left: auto;
     height: 2em;
     font-size: 0.9em;
 }
 textarea {
     width: 100%;
     height: 5em;
     padding: 2px;
     margin-bottom: 5px;
     resize: none;
     box-sizing: border-box;
 }
 .item {
     border-bottom: 1px solid #ddd;
     padding: 10px;
 }
 .class {
     margin-top: 0px;
 }
 .idline {
     margin-bottom: 0px;
 }
 .user {
     font-weight: bold;
     margin-right: 10px;
 }
 .handle {
     margin-right: 10px;
     color: #666;
 }
 .time {
     float: right;
     color: #666;
 }
</style>
