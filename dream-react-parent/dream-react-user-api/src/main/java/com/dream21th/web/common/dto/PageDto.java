package com.dream21th.web.common.dto;

import java.util.List;

import lombok.Builder;

@Builder
public class PageDto<T> {

	private Integer pageIndex;
	
	private Integer pageSize;
	
	private List<T> records;
	
	private Integer total;
	
	private T t;

	public PageDto(){

	}

	public PageDto(Integer pageIndex, Integer pageSize, List<T> records, Integer total, T t) {
		this.pageIndex = pageIndex;
		this.pageSize = pageSize;
		this.records = records;
		this.total = total;
		this.t = t;
	}

	public Integer getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(Integer pageIndex) {
		this.pageIndex = pageIndex;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public List<T> getRecords() {
		return records;
	}

	public void setRecords(List<T> records) {
		this.records = records;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public T getT() {
		return t;
	}

	public void setT(T t) {
		this.t = t;
	}
}
