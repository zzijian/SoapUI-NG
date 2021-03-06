function queryApi() {
    $.ajax({
        url:"/api/query",
        dataType:"json",
        data:{
            "apiId":$("#api-id").val(),
            "apiName":$("#api-name").val(),
            "apiType":$("#api-type").val(),
            "currPage":1
        },
        success:function (data) {
            $("#api-query-table tbody").html("");
            let list=data.list;
            let total=data.total;
            for (let i = 0; i < list.length; i++) {
                let tr = `<tr id="api-${list[i].apiId}"><td>${list[i].apiId}</td><td>${list[i].apiName}</td><td>${list[i].apiType}</td><td>${list[i].apiLink}</td>
                          <td>${list[i].accessMode}</td><td>${list[i].apiInfo}</td><td>
                          <a href="#modal-container-modify-api" data-toggle="modal" onclick="modifyApi(${list[i].apiId})" class="btn">修改</a>
                          <a onclick="deleteApi(${list[i].apiId})" class="btn">删除</a></td></tr>`;
                $("#api-query-table tbody").append(tr);
            }
            initApiPagination(total);
        },
        error: function(data){
            window.location="/error";
        }
    });
}
function queryApiByPage() {
    $.ajax({
        url:"/api/query",
        dataType:"json",
        data:{
            "apiId":$("#api-id").val(),
            "apiName":$("#api-name").val(),
            "apiType":$("#api-type").val(),
            "currPage":$("#api-pagination .active a").text()
        },
        success:function (data) {
            $("#api-query-table tbody").html("");
            let list=data.list;
            for (let i = 0; i < list.length; i++) {
                let tr = `<tr id="api-${list[i].apiId}"><td>${list[i].apiId}</td><td>${list[i].apiName}</td><td>${list[i].apiType}</td><td>${list[i].apiLink}</td>
                          <td>${list[i].accessMode}</td><td>${list[i].apiInfo}</td><td>
                          <a href="#modal-container-modify-api" data-toggle="modal" onclick="modifyApi(${list[i].apiId})" class="btn">修改</a>
                          <a onclick="deleteApi(${list[i].apiId})" class="btn">删除</a></td></tr>`;
                $("#api-query-table tbody").append(tr);
            }
        },
        error: function(data){
            window.location="/error";
        }
    });
}
function initApiPagination(total) {
    let $pagination = $('#api-pagination');
    $pagination.twbsPagination('destroy');
    if(total>0){
        let defaultOpts = {
            totalPages: Math.ceil(total/10),
            first:"<<",
            prev:"<",
            next:">",
            last:">>",
            onPageClick:queryApiByPage
        };
        $pagination.twbsPagination(defaultOpts);
    }
}

function insertApi() {
    $.ajax({
        url:"/api/insert",
        dataType:"json",
        data:{
            "apiName":$("#new-api-name").val(),
            "apiType":$("#new-api-type").val(),
            "apiLink":$("#new-api-link").val(),
            "accessMode":$("#new-api-access-mode").val(),
            "apiInfo":$("#new-api-info").val()
        },
        success:function (data) {
            if(data>0){
                $("#insert-api-modal-close").trigger("click");
                alert("新增成功！");
                queryApiByPage();
            }else if(0==data){
                alert("新增失败！");
            }else if(-1==data){
                alert("请检查相关测试计划是否存在！");
            }
        },
        error: function(data){
            window.location="/error";
        }
    });
}
function clearApiData() {
    document.getElementById("api-new-form").reset();
    document.getElementById("api-modify-form").reset();

}
function modifyApi(apiId) {
    let tempRow=$("#api-"+apiId);
    $("#modify-api-id").val(apiId);
    $("#modify-api-name").val(tempRow.find("td")[1].innerText);
    $("#modify-api-type").val(tempRow.find("td")[2].innerText);
    $("#modify-api-link").val(tempRow.find("td")[3].innerText);
    $("#modify-api-access-mode").val(tempRow.find("td")[4].innerText);
    $("#modify-api-info").val(tempRow.find("td")[5].innerText);
}
function updateApi(){
    $.ajax({
        url:"/api/update",
        dataType:"json",
        data:{
            "apiId":$("#modify-api-id").val(),
            "apiName":$("#modify-api-name").val(),
            "apiType":$("#modify-api-type").val(),
            "apiLink":$("#modify-api-link").val(),
            "accessMode":$("#modify-api-access-mode").val(),
            "apiInfo":$("#modify-api-info").val()
        },
        success:function (data) {
            if(1==data){
                $("#modify-api-modal-close").trigger("click");
                alert("更新成功！");
                queryApiByPage();
            }else if(0==data){
                alert("更新失败！");
            }else if(-1==data){
                alert("请检查相关测试计划是否已删除！");
            }
        },
        error: function(data){
            window.location="/error";
        }
    });
}
function deleteApi(apiId) {
    $.ajax({
        url:"/api/delete",
        dataType:"json",
        data:{
            "id":apiId
        },
        success:function (data) {
            if(1==data){
                alert("删除成功！");
                queryApiByPage();
            }else if(0==data){
                alert("删除失败！");
            }else if(-1==data){
                alert("请检查相关测试计划是否已删除！");
            }
        },
        error: function(data){
            window.location="/error";
        }
    });
}