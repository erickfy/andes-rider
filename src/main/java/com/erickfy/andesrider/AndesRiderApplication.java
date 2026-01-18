package com.erickfy.andesrider;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.erickfy.andesrider")
public class AndesRiderApplication {

	public static void main(String[] args) {
		SpringApplication.run(AndesRiderApplication.class, args);
	}

}
