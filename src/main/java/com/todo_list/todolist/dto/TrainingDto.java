package com.todo_list.todolist.dto;


import lombok.*;


import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TrainingDto {
    private Long id;
    private String skill;
    private LocalDateTime date;
    private String status;
}
