package dev.neetcloud.api;

import java.util.Arrays;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import dev.neetcloud.api.model.User;
import dev.neetcloud.api.repository.UserRepository;

@SpringBootApplication
public class NeetCloudApplication implements CommandLineRunner{


	@Autowired
	private UserRepository repository;

	protected final Log logger = LogFactory.getLog(getClass());

	public static void main(String[] args) {
		SpringApplication.run(NeetCloudApplication.class, args);
	}
	
		
	@Override
	public void run(String... args) throws Exception {

		//repository.deleteAll();

		// save a tester account
		//User tester = repository.findUserByUsername("tester");
		//if(tester.getUserName() == "tester"){
			//logger.info(tester.getUserName());
		//}
		
		//password is not converted to hash, because we use saving to the repository direct from commandRunner
		//repository.save(new User("tester", "tester", "tester", "admin@neetcloud.dev", "tester", "USER"));
		


		// fetch an users by userName = tester
		//System.out.println("User found with findByName('tester'):");
		//System.out.println("--------------------------------");
		//System.out.println(repository.findByName("tester"));
		
		//flush all
		//repository.deleteAll();
		
	}

	/**
	 * CORS configuration for development
	 * @return
	 */
	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:8081"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
				"Accept", "Authorization", "Origin, Accept", "X-Requested-With",
				"Access-Control-Request-Method", "Access-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
				"Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
		return new CorsFilter(urlBasedCorsConfigurationSource);
	}

}
