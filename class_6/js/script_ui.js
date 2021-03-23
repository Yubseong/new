var loadData; //json 파일의 정보를 담기 위한 전역 변수

$(function(){ 
    // 첫 인트로 영역 버튼 실행    
    introfn();

    //인트로 버튼 클릭 이벤트 정의
    $(".btn_setting").click(function(){
        $(".section.box_intro").removeClass("on");
        ajaxfn();
    });

    //자리 선택 섹션의 완료 버튼 클릭 이벤트 정의하기
    $(".btn_submit").click(function(){
        $(".section.reservation").removeClass("on");
        $(".section.complete").addClass("on");
        //개발자가 서버에 내용 전달하는 과정을 담는 부분

    });
})

// 첫 인트로 버튼
function introfn(){
    $(".section.box_intro").addClass("on");
}

//ajax를 통해 Json 파일 불러온 후 append로 자리 세팅하기 함수 정의
function ajaxfn(){
    $.ajax({
        url:"js/data.json",
        dataType:"json",
        success:function(result){
            //변수 저정
            loadData = result.seatInfo;

            //자리 셋팅 (index(순번) : i - 0~11)
            for(var i=0; i<loadData.length; i++){
                var _n = loadData[i].name;
                var _p = loadData[i].price;
                var _r = loadData[i].reserve;

                $(".section.reservation > ol").append('<li class="unit"><button data-price="'+_p+'" '+_r+'>'+_n+'</button></li>')

                
            }
            //자리 선택 섹션 노출
            $(".section.reservation").addClass("on");
            
            //배열이 선언 or 초기화
            var selected = [];
            
            //동적으로 세팅된 버튼에 클릭 이벤트를 선언
            $(".section.reservation > ol > li > button").click(function(){
                //배열 초기화
                selected = [];

                //자신에게 select 유무에 따라 select 클래스를 추가 / 삭제 처리하고 있음 (toggleClass를 통해서)
                $(this).toggleClass("select");

                //자리 길이만큼 for문이 반복
                for(var i=0; i<loadData.length; i++){
                    // 각각 자리별 버튼에 select 클래스가 있는지 확인, 확인한 후 있으면 true, 없으면 false
                    var _has = $(".section.reservation > ol > li").eq(i).find("button").hasClass("select")
                    //select 클래스를 갖고 있다면 배열에 index 값 저장
                    if(_has == true){
                        selected.push(i);
                    }
                    
                    // console.log(i, _has);
                }
                var selectedSeat = ""; // 선택자라면 저장용 변수 선언과 초기화
                var selectedCost = 0; // 선택값 총합 저장용 변수 선언과 초기화
                
                //저장된 인덱스를 활용한 하단 결과값 없데이트
                for(var i=0; i<selected.length; i++){
                    var _si = selected[i]; //선택된 index값만 저장

                    // console.log(loadData[_si].name);

                    //선택자리 누적(자기 자신에게 이전 값과 새로운 값을 더함)
                    // 아래와 동일한 연산 개념 selectedSeat = selectedSeat + loadData[_si].name + " ";
                    selectedSeat += loadData[_si].name + " ";
                    
                    //총합 누적 (자기 자신에게 이전 값과 새로운 값을 더함)
                    selectedCost += Number(loadData[_si].price);
                    // selectedCost = selectedCost + Number(loadData[_si].price);

                }
                // console.log(selectedSeat);

                //선택정보를 html상 각 영역에 업데이트(text를 통하여)
                $(".txt_info_number").text(selectedSeat);
                $(".txt_info_total").text(selectedCost);
                
                //선택정보를 html상 각 영역에 업데이트(text를 통하여)
                $(".section.complete .txt_number").text(selectedSeat);
                $(".section.complete .txt_price > strong").text(selectedCost);
            });
        }
    })
}