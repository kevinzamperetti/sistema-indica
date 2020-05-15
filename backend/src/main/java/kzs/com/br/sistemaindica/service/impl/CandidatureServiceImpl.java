package kzs.com.br.sistemaindica.service.impl;

import kzs.com.br.sistemaindica.entity.Candidature;
import kzs.com.br.sistemaindica.entity.Opportunity;
import kzs.com.br.sistemaindica.entity.User;
import kzs.com.br.sistemaindica.entity.dto.CandidatureQuantityDto;
import kzs.com.br.sistemaindica.enums.CandidatureStatus;
import kzs.com.br.sistemaindica.exception.*;
import kzs.com.br.sistemaindica.payload.UploadFileResponse;
import kzs.com.br.sistemaindica.repository.CandidatureRepository;
import kzs.com.br.sistemaindica.repository.OpportunityRepository;
import kzs.com.br.sistemaindica.repository.UserRepository;
import kzs.com.br.sistemaindica.service.CandidatureService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDate;
import java.util.List;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class CandidatureServiceImpl implements CandidatureService {

    private final CandidatureRepository repository;

    private final OpportunityRepository opportunityRepository;

    private final UserRepository userRepository;

    private final FileStorageServiceImpl fileStorageService;

    @Override
    public List<Candidature> findCandidatureByStatus(CandidatureStatus status) {
        return repository.findCandidatureByStatus(status);
    }

    @Override
    public Candidature findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new CandidatureIdNotFoundException("Id of Candidature not found."));
    }

    @Override
    public Candidature save(Candidature candidature) {
        if (nonNull(candidature.getId())) {
            throw new CandidatureIdMustNotBeProvidedException("Id of Candidature must not be provided.");
        }
        verifyFields(candidature);
        setOpportunity(candidature);
        setUser(candidature);
        candidature.setCreationDate(LocalDate.now());
        checkIfTheCandidatureAlreadyExists(candidature);
        return repository.save(candidature);
    }

    @Override
    public UploadFileResponse uploadAttachment(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    private void setOpportunity(Candidature candidature) {
        Opportunity opportunity = opportunityRepository.findById(candidature.getOpportunity().getId())
                .orElseThrow(() -> new CandidatureIdNotFoundException("Candidature not found."));
        candidature.setOpportunity(opportunity);
    }

    private void setUser(Candidature candidature) {
        User user = userRepository.findById(candidature.getUser().getId())
                .orElseThrow(() -> new CandidatureIdNotFoundException("User not found."));
        candidature.setUser(user);
    }

    private void checkIfTheCandidatureAlreadyExists(Candidature candidature) {
        if (repository.findByCandidatureEmailOrIndicationNameOrIndicationPhoneNumber(
                candidature.getCandidateEmail(), candidature.getCandidateName(),
                candidature.getCandidatePhoneNumber()).isPresent()) {
            throw new CandidatureYouAreAlreadyAppliedForThisOpportunityException("You are already applied for this opportunity.");
        }
    }

    @Override
    public Candidature edit(Candidature candidature) {
        if (isNull(candidature.getId())) {
            throw new OpportunityIdNotProvidedException("Id of Opportunity not provided.");
        }
        findById(candidature.getId());
        verifyFields(candidature);
        return repository.save(candidature);
    }

    @Override
    public void delete(Long id) {
        Candidature candidature = repository.findById(id)
                .orElseThrow(() -> new OpportunityIdNotFoundException("Id of Opportunity not found."));
        if(!CandidatureStatus.NEW.equals(candidature.getStatus())) {
            throw new CandidatureIsInProgressAndCannotBeDeletedException("Candidature is in progress and cannot be deleted.");
        } else {
            repository.delete(candidature);
        }
    }

    private void verifyFields(Candidature candidature) {
        if (isNull(candidature.getUser())) {
            throw new CandidatureUserNotProvidedException("User of Candidature not provided.");
        }
        if (isNull(candidature.getCandidateDocumentNumber())) {
            throw new CandidatureCandidateDocumentNumberNotProvidedException("Candidate Document Number of Candidature not provided.");
        }
        if (isNull(candidature.getOpportunity())) {
            throw new CandidatureOpportunityNotProvidedException("Opportunity of Candidature not provided.");
        }
//        if (isNull(candidature.getAttachment())) {
//            throw new CandidatureAttachmentNotProvidedException("Attachment of Candidature not provided.");
//        }
        if (isNull(candidature.getStatus())) {
            throw new CandidatureStatusNotProvidedException("Status of Candidature not provided.");
        }
        if (isNull(candidature.getCandidateName())) {
            throw new CandidatureCandidateNameNotProvidedException("Candidate Name of Candidature not provided.");
        }
        if (isNull(candidature.getCandidatePhoneNumber())) {
            throw new CandidatureCandidatePhoneNumberNotProvidedException("Candidate Phone Number of Candidature not provided.");
        }
        if (isNull(candidature.getCandidateEmail())) {
            throw new CandidatureCandidateEmailNotProvidedException("Candidate Email of Candidature not provided.");
        }
    }

    @Override
    public CandidatureQuantityDto totalCandidaturiesByStatus() {
        return CandidatureQuantityDto.builder()
                .qtyCandidaturiesNew(repository.countCandidatureStatusNew())
                .qtyCandidaturiesInProgress(repository.countCandidatureStatusInProgress())
                .qtyCandidaturiesHired(repository.countCandidatureStatusHired())
                .qtyCandidaturiesFinihsed(repository.countCandidatureStatusFinished())
                .build();
    }
}