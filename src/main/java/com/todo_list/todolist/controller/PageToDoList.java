package com.todo_list.todolist.controller;

import com.todo_list.todolist.dto.TrainingDto;
import com.todo_list.todolist.service.TrainingService;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@AllArgsConstructor
@RequestMapping("/")
public class PageToDoList {


    private TrainingService trainingService;

    @GetMapping("/")
    public String getTodoList(@NotNull Model model){
        List<TrainingDto> trainingDtos = trainingService.getAllTraining();
        model.addAttribute("todo",trainingDtos);
        return "index";
    }

}
