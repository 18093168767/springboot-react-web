/**
 * 
 */
package com.dream21th.webzuul.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

/**
 * @author zhailiang
 *
 */
@Configuration
public class BrowserSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	protected AuthenticationSuccessHandler dreamAuthenticationSuccessHandler;
	
	@Autowired
	protected AuthenticationFailureHandler dreamAuthenticationFailureHandler;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.formLogin()
		    .loginPage("/login_p")
		    .loginProcessingUrl("/authentication/login")
		    .usernameParameter("username").passwordParameter("password").permitAll()
		    .successHandler(dreamAuthenticationSuccessHandler)
		    .failureHandler(dreamAuthenticationFailureHandler)
		    .and()
		    .authorizeRequests()
		    .antMatchers("/authentication/require","/imooc-signIn.html","/web/**").permitAll()
		    .anyRequest()
		    .authenticated()
		    .and()
		    .csrf().disable();
		
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
}
