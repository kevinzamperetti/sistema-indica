package kzs.com.br.sistemaindica.service.impl;

import kzs.com.br.sistemaindica.exception.FileStorageException;
import kzs.com.br.sistemaindica.exception.MyFileNotFoundException;
import kzs.com.br.sistemaindica.property.FileStorageProperty;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class FileStorageServiceImpl {

    private final Path fileStorageLocation;

    @Autowired
    public FileStorageServiceImpl(FileStorageProperty fileStorageProperty) {
        this.fileStorageLocation = Paths.get(fileStorageProperty.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Não foi possível criar o diretório em que os arquivos enviados serão armazenados.", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        // Normalize file name
//        String fileName = StringUtils.cleanPath(file.getOriginalFilename().replace(" ", "_").replaceAll("[^\\p{ASCII}]", ""));
        String fileName = "Curriculo";
        String fileBaseName = FilenameUtils.getBaseName(fileName).concat("_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")));
//        String fileExtension = FilenameUtils.getExtension(fileName);
        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
        fileName = fileBaseName.concat("." + fileExtension);

        if (!"pdf".toUpperCase().equals(fileExtension.toUpperCase())) {
            throw new FileStorageException("Extensão do arquivo não é aceita! " +
                                           "Extensão aceita: PDF, extensão do seu arquivo: " + fileExtension);
        }

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileStorageException("Nome do arquivo contém sequência de caminho inválida: " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation);

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Não foi possível armazenar o arquivo " + fileName + ". Tente novamente!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("File " + fileName + " não encontrado");
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File " + fileName + " não encontrado", ex);
        }
    }
}
