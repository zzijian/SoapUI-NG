package io.mojohao.soapui_ng.controller;

import io.mojohao.soapui_ng.entity.ChartTypeDto;
import io.mojohao.soapui_ng.entity.UserEleData;
import io.mojohao.soapui_ng.service.UserEleDataService;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/data")
public class UserEleDataController {
    @Autowired
    private UserEleDataService userEleDataService;

    @ResponseBody
    @RequestMapping(value = "/all")
    List<UserEleData> getAllUserEleDatas(){
        return userEleDataService.getAllUserEleDatas();
    }

    UserEleData queryUserEleDataById(int dataId){
        return null;
    }

    @ResponseBody
    @RequestMapping(value = "/query")
    HashMap<String,Object> queryUserEleDataByCondition(String dataId,String userId,String userElemCode,int currPage){
        Map param=new HashMap<String,Object>();
        if(StringUtils.isNotBlank(dataId)&&StringUtils.isNumeric(dataId)){
            param.put("dataId",Integer.parseInt(dataId));
        }
        if(StringUtils.isNotBlank(userId)&&StringUtils.isNumeric(userId)){
            param.put("userId",Integer.parseInt(userId));
        }
        if(StringUtils.isNotBlank(userElemCode)){
            param.put("elemId",userElemCode);
        }
        if(currPage<=0) {
            currPage = 1;
        }
        param.put("currPage",currPage);
        HashMap<String,Object> retMap=new HashMap<>();
        retMap.put("list",userEleDataService.queryUserEleDataByPage(param));
        retMap.put("total",userEleDataService.queryAmount(param));
        return retMap;
    }

    @ResponseBody
    @RequestMapping(value = "/delete")
    int deleteUserEleDataById(int dataId){
        return userEleDataService.deleteUserEleDataById(dataId);
    }

    @ResponseBody
    @RequestMapping(value = "/update")
    int updateUserEleData(String dataId,String elemId,String userId,String elemData,String collectTime) throws ParseException {
        UserEleData userEleData = new UserEleData();
        if(StringUtils.isNotBlank(dataId)&&StringUtils.isNumeric(dataId)){
            userEleData.setDataId(Integer.parseInt(dataId));
        }
        if(StringUtils.isNotBlank(elemId)){
            userEleData.setElemId(elemId);
        }
        if(StringUtils.isNotBlank(userId)&&StringUtils.isNumeric(userId)){
            userEleData.setUserId(Integer.parseInt(userId));
        }
        if(StringUtils.isNotBlank(elemData)&&StringUtils.isNumeric(elemData)){
            userEleData.setElemData(Double.parseDouble(elemData));
        }
        if(StringUtils.isNotBlank(collectTime)){
            userEleData.setCollectTime(convertDate(collectTime));
        }
        return userEleDataService.updateUserEleData(userEleData);
    }

    @ResponseBody
    @RequestMapping(value = "/insert")
    int insertUserEleData(String elemId,String userId,String elemData,String collectTime) throws ParseException {
        UserEleData userEleData = new UserEleData();
        if(StringUtils.isNotBlank(elemId)){
            userEleData.setElemId(elemId);
        }
        if(StringUtils.isNotBlank(userId)&&StringUtils.isNumeric(userId)){
            userEleData.setUserId(Integer.parseInt(userId));
        }
        if(StringUtils.isNotBlank(elemData)&&StringUtils.isNumeric(elemData)){
            userEleData.setElemData(Double.parseDouble(elemData));
        }
        if(StringUtils.isNotBlank(collectTime)){
            userEleData.setCollectTime(convertDate(collectTime));
        }
        return userEleDataService.insertUserEleData(userEleData);
    }

    @ResponseBody
    @RequestMapping(value = "/categoryByUserId")
    List<ChartTypeDto> categoryByUserId(){
        return userEleDataService.categoryByUserId();
    }

    private Timestamp convertDate(String date) throws ParseException {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        format.setLenient(false);
        return new Timestamp(format.parse(date).getTime());

    }
}
