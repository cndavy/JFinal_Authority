package com.ccb.project.vo;

import java.util.Date;

/**
 * Created by han on 2015/7/2.
 */
public class calEventItem  {
  /*  eventItems本身是个数组，数组的项本身又是个数组，结构如下所示
    [主键,标题,开始时间,结束时间，是否全天日程，是否跨天日程,是否循环日程,颜色主题,是否有权限,地点,参与人]
    对应的数据类型
    [String,String,Date,Date,1/0,1/0,1/0,0-21,0/1,String,String]*/
    String id;

   Date startTime ;
    Date endTime;

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    String subject;
    Boolean isAllDayEvent;
    String  color;
    String location;

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Boolean getIsAllDayEvent() {
        return isAllDayEvent;
    }

    public void setIsAllDayEvent(Boolean isAllDayEvent) {
        this.isAllDayEvent = isAllDayEvent;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPerson() {
        return person;
    }

    public void setPerson(String person) {
        this.person = person;
    }

    String person ;
}
