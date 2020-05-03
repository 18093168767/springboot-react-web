/**
 * 
 */
package com.dream21th.webzuul.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author zhailiang
 *
 */
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleResponse {
	
	public String code;
	
	public Object content;
}
