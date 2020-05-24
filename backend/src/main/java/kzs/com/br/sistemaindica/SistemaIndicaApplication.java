package kzs.com.br.sistemaindica;

import kzs.com.br.sistemaindica.property.FileStorageProperty;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({FileStorageProperty.class})
public class SistemaIndicaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SistemaIndicaApplication.class, args);
	}

}
