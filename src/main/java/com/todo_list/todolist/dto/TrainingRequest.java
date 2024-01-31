package com.todo_list.todolist.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TrainingRequest {
    private Integer id;
    private String skill;
    private LocalDateTime date;
    private String status;
}
