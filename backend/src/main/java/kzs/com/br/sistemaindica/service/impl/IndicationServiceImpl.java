package kzs.com.br.sistemaindica.service.impl;

import kzs.com.br.sistemaindica.entity.Indication;
import kzs.com.br.sistemaindica.entity.Opportunity;
import kzs.com.br.sistemaindica.entity.User;
import kzs.com.br.sistemaindica.entity.dto.IndicationQuantityDto;
import kzs.com.br.sistemaindica.entity.dto.IndicationStatusDto;
import kzs.com.br.sistemaindica.entity.dto.IndicationUserQuantityDto;
import kzs.com.br.sistemaindica.enums.IndicationStatus;
import kzs.com.br.sistemaindica.exception.*;
import kzs.com.br.sistemaindica.payload.UploadFileResponse;
import kzs.com.br.sistemaindica.repository.IndicationRepository;
import kzs.com.br.sistemaindica.repository.OpportunityRepository;
import kzs.com.br.sistemaindica.repository.UserRepository;
import kzs.com.br.sistemaindica.service.IndicationHistoryService;
import kzs.com.br.sistemaindica.service.IndicationService;
import kzs.com.br.sistemaindica.service.IndicationWinnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDate;
import java.util.List;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class IndicationServiceImpl implements IndicationService {

    private final IndicationRepository repository;

    private final OpportunityRepository opportunityRepository;

    private final UserRepository userRepository;

    private final IndicationHistoryService indicationHistoryService;

    private final IndicationWinnerService indicationWinnerService;

    private final FileStorageServiceImpl fileStorageService;

    @Override
    public List<Indication> findIndicationByStatus(IndicationStatus status) {
        return repository.findIndicationByStatus(status);
    }

    @Override
    public Indication findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IndicationIdNotFoundException("Indicação não encontrada"));
    }

    @Override
    public List<Indication> findByUser(Long id) {
        userRepository.findById(id)
                .orElseThrow(() -> new UserIdNotFoundException("Usuário não encontrado"));
        return repository.findByUser(id);
    }

    @Override
    public Indication save(Indication indication) {
        if (nonNull(indication.getId())) {
            throw new IndicationIdMustNotBeProvidedException("Id da Indicação não deve ser informado.");
        }
        verifyFields(indication);
        setOpportunity(indication);
        setUser(indication);
        validateUserAndIndication(indication);
        indication.setCreationDate(LocalDate.now());
        checkIfTheIndicationAlreadyExists(indication);

        Indication indicationSaved = repository.save(indication);
        setIndicationHistory(indicationSaved);
        return indicationSaved;
    }

    @Override
    public UploadFileResponse uploadAttachment(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/file/downloadFile/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    private void setOpportunity(Indication indication) {
        Opportunity opportunity = opportunityRepository.findById(indication.getOpportunity().getId())
                .orElseThrow(() -> new IndicationIdNotFoundException("Oportunidade não encontrada"));
        indication.setOpportunity(opportunity);
    }

    private void setUser(Indication indication) {
        User user = userRepository.findById(indication.getUser().getId())
                .orElseThrow(() -> new IndicationIdNotFoundException("Usuário não encontrado"));
        indication.setUser(user);
    }

    private void checkIfTheIndicationAlreadyExists(Indication indication) {
        if (repository.findByIndicationEmailOrIndicationNameOrIndicationPhoneNumber(
                indication.getIndicationEmail(), indication.getIndicationName(),
                indication.getIndicationPhoneNumber()).isPresent()) {
            throw new IndicationThisPersonAlreadyHasIndicationException("Esta pessoa já possui uma indicação");
        }
    }

    @Override
    public Indication edit(Indication indication) {
        if (isNull(indication.getId())) {
            throw new OpportunityIdNotProvidedException("Id da Oportunidade não informado");
        }
        findById(indication.getId());
        verifyFields(indication);
        return repository.save(indication);
    }

    @Override
    @Transactional
    public Indication updateStatus(IndicationStatusDto indicationStatusDto) {
        if (isNull(indicationStatusDto.getStatus())) {
            throw new IndicationStatusNotProvidedException("Situação para alteração da Indicação não informado");
        }
        Indication indication = repository.findById(indicationStatusDto.getId())
                .orElseThrow(() -> new OpportunityIdNotFoundException("Oportunidade não encontrada"));

        indication.setStatus(indicationStatusDto.getStatus());

        Indication indicationSaved = repository.save(indication);
        setIndicationHistory(indicationSaved);
        if (IndicationStatus.HIRED.equals(indicationStatusDto.getStatus())) {
            setIndicationWinner(indicationSaved);
        }
        return indicationSaved;
    }

    private void setIndicationHistory(Indication indication) {
        indicationHistoryService.save(indication);
    }

    private void setIndicationWinner(Indication indication) {
        indicationWinnerService.save(indication);
    }

    @Override
    public void delete(Long id) {
        Indication indication = repository.findById(id)
                .orElseThrow(() -> new OpportunityIdNotFoundException("Oportunidade não encontrada"));
        if(!IndicationStatus.NEW.equals(indication.getStatus())) {
            throw new IndicationIsInProgressAndCannotBeDeletedException("Indicação está em andamento e não pode ser excluída");
        } else {
            repository.delete(indication);
        }
    }

    private void verifyFields(Indication indication) {
        if (isNull(indication.getUser())) {
            throw new IndicationUserNotProvidedException("Usuário da Indicação não informado");
        }
        if (isNull(indication.getUserDocumentNumber())) {
            throw new IndicationUserDocumentNumberNotProvidedException("CPF do Usuário não informado");
        }
        if (isNull(indication.getOpportunity())) {
            throw new IndicationOpportunityNotProvidedException("Oportunidade da Indicação não informada");
        }
        if (isNull(indication.getStatus())) {
            throw new IndicationStatusNotProvidedException("Situação da Indicação não informada");
        }
        if (isNull(indication.getIndicationName())) {
            throw new IndicationNameNotProvidedException("Nome do Indicado não informado");
        }
        if (isNull(indication.getIndicationPhoneNumber())) {
            throw new IndicationPhoneNumberNotProvidedException("Telefone do Indicado não informado");
        }
        if (isNull(indication.getIndicationEmail())) {
            throw new IndicationEmailNotProvidedException("E-mail do Indicado não informado");
        }
    }

    private void validateUserAndIndication(Indication indication) {
        if (indication.getUser().getName().equals(indication.getIndicationName())) {
            throw new IndicationCannotBePerformedForYouException("Não é possível realizar uma indicação para você mesmo");
        }
    }

    @Override
    public IndicationQuantityDto totalIndicationsByStatus() {
        return IndicationQuantityDto.builder()
                .qtyIndicationsNew(repository.countIndicationStatusNew())
                .qtyIndicationsInProgress(repository.countIndicationStatusInProgress())
                .qtyIndicationsHired(repository.countIndicationStatusHired())
                .qtyIndicationsDiscarded(repository.countIndicationStatusDiscarded())
                .build();
    }

    public IndicationUserQuantityDto totalIndicationsByUser(String userEmail) {
        return IndicationUserQuantityDto.builder()
                .qtyIndicationsInProgressByUser(repository.countIndicationsInProgressByUser(userEmail))
                .qtyIndicationsHiredByUser(repository.countIndicationsHiredByUser(userEmail))
                .qtyIndicationsDiscardedByUser(repository.countIndicationsDiscardedByUser(userEmail))
                .build();
    }

}