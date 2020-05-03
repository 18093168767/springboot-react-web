package com.dream21th.webzuul.util;

import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Created by sang on 2017/12/30.
 */
public class HrUtils {
    public static Object getCurrentHr() {
        return SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}