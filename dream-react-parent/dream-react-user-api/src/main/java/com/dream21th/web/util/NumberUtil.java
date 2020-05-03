package com.dream21th.web.util;

import java.time.LocalDateTime;
import java.util.Random;

public class NumberUtil {

	public static Long generate14Num() {
		LocalDateTime localTime=LocalDateTime.now();
		return Long.valueOf(localTime.getDayOfYear()+""+localTime.getDayOfMonth()+""+localTime.getDayOfMonth()+""+localTime.getHour()+""+localTime.getMinute()+""+localTime.getSecond());
	}
	
	public static int random11() {
		return Integer.valueOf(new Random().nextInt(1000)+""+new Random().nextInt(1000)+""+new Random().nextInt(999));
	}
}
