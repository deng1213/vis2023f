function _1(md){return(
md`# Data Visualization - hw02 strong baseline
by 112C53023  
參考 https://observablehq.com/d/9e6d2a2cc3fd1678@69`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _Counts(){return(
[]
)}

function _4(Counts,data)
{
  Counts.length = 0;
  for (var s=0; s<=11; s++) {
    Counts.push(  { constellation : s, gender : "male", count : 0 } );
    Counts.push(  { constellation : s, gender : "female", count : 0 } );   
  }
  data.forEach (x=> {
    var i = (x.Constellation)*2 + (x.Gender=="男" ? 0 : 1); 
    Counts[i].count++;
  })
  return Counts
}


function _list(){return(
["牡羊座",  "金牛座",  "雙子座",  "巨蟹座",  "獅子座",  "處女座",  "天秤座",  "天蠍座",  "射手座",  "摩羯座",  "水瓶座",  "雙魚座 "]
)}

function _6(Plot,Counts,list){return(
Plot.plot({
  grid: true,
  y: {grid: true, label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(Counts, {
      x: "constellation",
      y: "count",
      fill: "gender",
      tip: true,
      title: (d) =>
        `count: ${d.count} \nConstellation: ${list[d.constellation]}\ngender: ${d.gender}`
    }),
    Plot.axisX({
      tickFormat: d => {
        return list[d]; 
      },
    }),
  ]
})
)}

function _7(Plot,data,list){return(
Plot.plot({
  width: 900,
  grid: true,
  x: { domain: [0, 12]},
	y: { label: "count"},  
	marks: [    
		Plot.rectY(data, Plot.binX(
      {y:"count"}, 
      {x:"Constellation", interval:1, 
       fill:"Gender", //color
       tip: true,
       title: (d) =>
        `Constellation: ${list[d.constellation]}
        \ngender: ${d.Gender}
        \n`},)),
		Plot.axisX({
      tickFormat: d => {
        return list[d]; 
      },
    }),
    Plot.ruleY([0]),
	 ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("Counts")).define("Counts", _Counts);
  main.variable(observer()).define(["Counts","data"], _4);
  main.variable(observer("list")).define("list", _list);
  main.variable(observer()).define(["Plot","Counts","list"], _6);
  main.variable(observer()).define(["Plot","data","list"], _7);
  return main;
}
