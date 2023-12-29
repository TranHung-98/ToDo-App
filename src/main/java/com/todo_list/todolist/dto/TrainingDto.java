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
public class TrainingDto {

    private Long id;
    private String skill;
    private LocalDateTime date;
    private String status;

}
