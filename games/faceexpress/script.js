
    var duration = 20; //检测的时间
    var kkk = null
    time1=$.cookie("time1")||duration;
    dis1=$.cookie("dis1")



    function result2txt(resultjson,duration) {

      if(resultjson == undefined) {
        return null;

      }
      var output = "检测结果：";
      var stringN = "你的表情还有点僵硬;";
      var stringH = "你看起来很高兴;";
      var stringS = "你看起来有点悲伤;";
      var stringA = "你看起来有点生气;";
      var stringSP = "你看起来有点惊讶;";
      var stringF = "你看起来有点害怕;";
      var stringD = "看起来你不喜欢我;";
      var stringNO = "您的检测失败了，请重新正面面对摄像头，再检测一次吧;"
      var stringLink = '<a class ="url" href= "http://www.3keu.vip/games/sleepless"> 点击链接，来听点音乐放松一下心情吧!! </a>'

      // var hhh = '<a class ="url" href= "http://www.3keu.vip/games/sleepless"> 提示: 请正面面对摄像头 </a>'


      // var url = "http://222.31.64.15:49155/web/7.jpg";
      // var out = "<a href='"+url+"'>"+url+"</a>";


      // console.log(resultjson)

      sum = resultjson.fearful + resultjson.sad + resultjson.surprised + resultjson.disgusted + resultjson.angry + resultjson.happy

      if(sum + resultjson.neutral< 50) { 
        output = output + stringNO 
      } else {
        if(resultjson.fearful/sum >= 0.3) {output = output + stringF + stringLink }
        if(resultjson.sad/sum >= 0.3) {output = output + stringS + stringLink}
        if(resultjson.surprised/sum >= 0.3) {output = output + stringSP + stringLink}
        if(resultjson.disgusted/sum >= 0.3) {output = output + stringD + stringLink}
        if(resultjson.angry/sum >= 0.3) {output = output + stringA + stringLink}
        if(resultjson.happy/sum >= 0.3) {output = output + stringH} 
        if(resultjson.neutral/sum >= 0.3) {output = output + stringN + stringLink }      

      }

      // console.log(resultjson)
      console.log(output)
      // return(output)
      document.getElementById("resulttxt").innerHTML = output;
      document.getElementById("resulttxt").addClass(url);
      // document.write(stringLink.link("http://www.3keu.vip/games/sleepless"));

    }



    function countDown($obj){
        var time;
        if($obj.attr("id")=="b1")
        {
            time=--time1;
            $.cookie("time1",time,{"expires":1});
            if(time<=0){
                time1=20;
                $obj[0].disabled=!$obj[0].disabled
                clearInterval(inter1)
                $obj.text("重新测试一下")
                // document.getElementById("resulttxt").innerHTML = result2txt(kkk);
                // $("#resulttxt").innerHTML  = kkk;
                result2txt(kkk);

                // stream.getTracks()[0].stop();
                // document.getElementById('video').addClass('hide');
                $.cookie("dis1","")
                return
            }
        }
        $obj.text(time+"秒后显示分析结果")
 
    }
    


    var testarr = [];  // 临时数组变量，存储每次检测结果
    var defaultrate = 0.6   //默认比例

    // 解析结果object，并生成最终结果的json数据
    // resultobj为face api输出结果，rate 为置信比例，默认为0.8
    function expressresult(resultobj, rate) {
      if (resultobj) {
        // console.log(JSON.stringify(result))
        var json = eval('(' + JSON.stringify(resultobj) + ')');
        // console.log(json.expressions);
        // var testarr = [];
        var resultjson = {neutral:0,happy:0,sad:0,angry:0,fearful:0,disgusted:0,surprised:0};
        testarr.push(json.expressions);
        // var count = 0
        for(var i = 0; i < testarr.length; i++){//遍历json数组时，这么写p为索引

            if(testarr[i].happy >= rate)
              resultjson.happy =  resultjson.happy +1 ;
            if(testarr[i].sad >= rate)
              resultjson.sad =  resultjson.sad +1 ;
            if(testarr[i].angry >= rate)
              resultjson.angry =  resultjson.angry +1 ;
            if(testarr[i].neutral >= rate)
              resultjson.neutral =  resultjson.neutral +1 ;
            if(testarr[i].fearful >= rate)
              resultjson.fearful =  resultjson.fearful +1 ;
            if(testarr[i].fearful >= rate)
              resultjson.disgusted =  resultjson.disgusted +1 ;
            if(testarr[i].surprised >= rate)
              resultjson.surprised =  resultjson.surprised +1 ;
        }
        // console.log(testarr[0].happy);
        // console.log(resultjson)
        return(resultjson);
      }

    }
 

const video = document.getElementById('video')
// const button = document.getElementById('testemotion')
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/gh/wxiguang/CDN-for-Blog/games/FaceReg/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/gh/wxiguang/CDN-for-Blog/games/FaceReg/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/gh/wxiguang/CDN-for-Blog/games/FaceReg/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('https://cdn.jsdelivr.net/gh/wxiguang/CDN-for-Blog/games/FaceReg/models')
])

function startVideo() {
    navigator.getUserMedia(
      { video: {} },
      stream => video.srcObject = stream,
      err => console.error(err))

}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)

  $(function(){
      if(dis1="dis"){
          $("#b1")[0].disabled='disabled'
          inter1=setInterval(function(){countDown($("#b1"))},1000)
      }

  //   $(".cd").bind("click",function(){
  //     $this=$(this);
  //     //没有被禁用时禁用并执行倒计时
  //     if(!$this[0].disabled){
  //     $this[0].disabled='disabled';
  //         if($this.attr("id")=="b1"){
  //             $.cookie("dis1","dis",{"expires":1})
  //           inter1=setInterval(function(){countDown($this)},1000)
  //         }
   
  //     }
  // })
 
})

    // var testarr = []; 

  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    // const detectionWithExpressions = await faceapi.detectSingleFace(video,new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
    // const detectionsWithExpressions = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

    const result = await faceapi.detectSingleFace(video,new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()

    // console.log(detectionWithExpressions）
    kkk = expressresult(result,defaultrate);
      // console.log(kkk)
   
      // console.log(expressresult(result,defaultrate));


  }, 200)



})