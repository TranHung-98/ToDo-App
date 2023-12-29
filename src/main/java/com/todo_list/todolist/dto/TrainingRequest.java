package com.todo_list.todolist.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TrainingRequest {
    private Integer id;
    private String skill;
    private LocalDateTime date;
    private String status;
}
