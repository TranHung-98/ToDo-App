package com.todo_list.todolist.controller;

import com.todo_list.todolist.dto.TrainingDto;
import com.todo_list.todolist.dto.TrainingRequest;
import com.todo_list.todolist.service.TrainingService;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin("http://127.0.0.1:5501/")
public class TrainingController {

    private final TrainingService trainingService;

    public TrainingController(TrainingService trainingService) {
        this.trainingService = trainingService;
    }

    @GetMapping("/todo")
    public ResponseEntity<List<TrainingDto>> getAllTraining(){
        List<TrainingDto> trainingDtos = trainingService.getAllTraining();
        return  new ResponseEntity<>(trainingDtos, HttpStatus.OK);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<TrainingDto>> findAllByStatus(@RequestParam("filterValue") String skill) {
        List<TrainingDto> trainingDtos = trainingService.findByStatus(skill);
        return new ResponseEntity<>(trainingDtos, HttpStatus.OK);
    }


    @PostMapping("/save")
    public String saveTraining(@RequestBody @NotNull TrainingRequest trainingRequest) {
        String skill = trainingRequest.getSkill();
        LocalDateTime date = trainingRequest.getDate();
        String status = trainingRequest.getStatus();

        boolean result = trainingService.saveTraining(skill, date, status);

        return result ? "Success" : "Failure";
    }


    @PutMapping("/updateTraining")
    @ResponseStatus(HttpStatus.OK)
    public void updateTraining(@RequestBody TrainingRequest trainingRequest) {
        trainingService.updateTodoAll(trainingRequest);
    }


    @DeleteMapping("/deleteTraining/{id}/{skill}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteTraining(@PathVariable Long id, @PathVariable String skill) {
        try {

            boolean deleted = trainingService.deleteAllBySkillAndId(skill, id);

            if (!deleted) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete training");
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred during deletion");
        }
    }

    @DeleteMapping("/deleteTraining/{ids}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteTraining(@PathVariable List<Long> ids) {
        try {
            boolean deleted = trainingService.deleteById(ids);

            if (!deleted) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete training");
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred during deletion");
        }
    }


}
