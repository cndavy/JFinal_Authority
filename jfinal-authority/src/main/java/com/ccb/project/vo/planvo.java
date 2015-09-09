package com.ccb.project.vo;

import java.sql.Date;

/**
 * Created by han on 2015/6/29.
 */
public class planvo {
   private   String uid;
    private   String prjId;
    private Date endDate;

    public Date getBgnDate() {
        return bgnDate;
    }

    public void setBgnDate(Date bgnDate) {
        this.bgnDate = bgnDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getPrjId() {
        return prjId;
    }

    public void setPrjId(String prjId) {
        this.prjId = prjId;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    private   Date bgnDate;
}
