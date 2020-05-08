package kzs.com.br.sistemaindica.Service.impl;

import kzs.com.br.sistemaindica.Entity.Indication;
import kzs.com.br.sistemaindica.Entity.Opportunity;
import kzs.com.br.sistemaindica.Entity.User;
import kzs.com.br.sistemaindica.Enum.IndicationStatus;
import kzs.com.br.sistemaindica.Exception.*;
import kzs.com.br.sistemaindica.Repository.IndicationRepository;
import kzs.com.br.sistemaindica.Repository.OpportunityRepository;
import kzs.com.br.sistemaindica.Repository.UserRepository;
import kzs.com.br.sistemaindica.Service.IndicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    @Override
    public List<Indication> findIndicationByStatus(IndicationStatus status) {
        return repository.findIndicationByStatus(status);
    }

    @Override
    public Indication findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IndicationIdNotFoundException("Id of Indication not found."));
    }

    @Override
    public Indication save(Indication indication) {
        if (nonNull(indication.getId())) {
            throw new IndicationIdMustNotBeProvidedException("Id of Indication must not be provided.");
        }
        verifyFields(indication);
        setOpportunity(indication);
        setUser(indication);
        validateUserAndIndication(indication);
        indication.setCreationDate(LocalDate.now());
        checkIfTheIndicationAlreadyExists(indication);
        return repository.save(indication);
    }

    private void setOpportunity(Indication indication) {
        Opportunity opportunity = opportunityRepository.findById(indication.getOpportunity().getId())
                .orElseThrow(() -> new IndicationIdNotFoundException("Opportunity not found."));
        indication.setOpportunity(opportunity);
    }

    private void setUser(Indication indication) {
        User user = userRepository.findById(indication.getUser().getId())
                .orElseThrow(() -> new IndicationIdNotFoundException("User not found."));
        indication.setUser(user);
    }

    private void checkIfTheIndicationAlreadyExists(Indication indication) {
        if (repository.findByIndicationEmailOrIndicationNameOrIndicationPhoneNumber(
                indication.getIndicationEmail(), indication.getIndicationName(),
                indication.getIndicationPhoneNumber()).isPresent()) {
            throw new IndicationThisPersonAlreadyHasIndicationException("This person already has indication");
        }
    }

    @Override
    public Indication edit(Indication indication) {
        if (isNull(indication.getId())) {
            throw new OpportunityIdNotProvidedException("Id of Opportunity not provided.");
        }
        findById(indication.getId());
        verifyFields(indication);
        return repository.save(indication);
    }

    @Override
    public void delete(Long id) {
        Indication indication = repository.findById(id)
                .orElseThrow(() -> new OpportunityIdNotFoundException("Id of Opportunity not found."));
        if(!IndicationStatus.NEW.equals(indication.getStatus())) {
            throw new IndicationIsInProgressAndCannotBeDeletedException("Indication is in progress and cannot be deleted.");
        } else {
            repository.delete(indication);
        }
    }

    private void verifyFields(Indication indication) {
        if (isNull(indication.getUser())) {
            throw new IndicationUserNotProvidedException("User of Indication not provided.");
        }
        if (isNull(indication.getUserDocumentNumber())) {
            throw new IndicationUserDocumentNumberNotProvidedException("User Document of Indication not provided.");
        }
        if (isNull(indication.getOpportunity())) {
            throw new IndicationOpportunityNotProvidedException("Opportunity of Indication not provided.");
        }
//        if (isNull(indication.getAttachment())) {
//            throw new IndicationAttachmentNotProvidedException("Attachment of Indication not provided.");
//        }
        if (isNull(indication.getStatus())) {
            throw new IndicationStatusNotProvidedException("Status of Indication not provided.");
        }
        if (isNull(indication.getIndicationName())) {
            throw new IndicationNameNotProvidedException("Indication Name of Indication not provided.");
        }
        if (isNull(indication.getIndicationPhoneNumber())) {
            throw new IndicationPhoneNumberNotProvidedException("Indication Phone Number of Indication not provided.");
        }
        if (isNull(indication.getIndicationEmail())) {
            throw new IndicationEmailNotProvidedException("Indication Email of Indication not provided.");
        }
    }

    private void validateUserAndIndication(Indication indication) {
        if (indication.getUser().getName().equals(indication.getIndicationName())) {
            throw new IndicationCannotBePerformedForYouException("Indication cannot be performed for you.");
        }
    }

}