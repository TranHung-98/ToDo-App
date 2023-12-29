package com.todo_list.todolist.service;

import com.todo_list.todolist.dto.TrainingDto;
import com.todo_list.todolist.dto.TrainingRequest;
import com.todo_list.todolist.entities.Training;
import com.todo_list.todolist.repository.TrainingRepository;
import lombok.AllArgsConstructor;
import org.hibernate.HibernateException;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TrainingService {

    private final TrainingRepository trainingRepository;

    public List<TrainingDto> getAllTraining() {
        List<Training> trainings = trainingRepository.findAll();
        return convertToDtoList(trainings);
    }


    public  List<TrainingDto> findByStatus(String skill) {
        List<Training> trainings = trainingRepository.findAllByStatus(skill);
        return convertToDtoList(trainings);
    }

    private List<TrainingDto> convertToDtoList(@NotNull List<Training> trainings) {
        return trainings.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private @NotNull TrainingDto convertToDto (@NotNull Training training) {
        TrainingDto trainingDto = new TrainingDto();
        trainingDto.setId(training.getId());
        trainingDto.setDate(training.getDate());
        trainingDto.setSkill(training.getSkill());
        trainingDto.setId(training.getId());
        trainingDto.setStatus(training.getStatus());

        return trainingDto;
    }

    public boolean saveTraining(String skill, LocalDateTime date, String status) {
        try {
            trainingRepository.saveTraining(skill, date, status);
        } catch (HibernateException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Transactional
    public boolean updateAll(@NotNull TrainingRequest trainingRequest) {
        int updatedRows = trainingRepository.updateTraining(
                Long.valueOf(trainingRequest.getId()),
                trainingRequest.getSkill(),
                trainingRequest.getDate(),
                trainingRequest.getStatus()
        );
        return updatedRows > 0;
    }

    @Transactional
    public  boolean deleteAllBySkillAndId(String skill,Long id) {
        try {
            trainingRepository.deleteBySkillAndId(skill,id);
            return true;
        }catch (HibernateException e) {
            return false;
        }

    }

    @Transactional
    public  boolean deleteById(List<Long> ids) {
        try {
            trainingRepository.deleteByIdIn(ids);
            return true;
        }catch (HibernateException e) {
            return false;
        }

    }

}
