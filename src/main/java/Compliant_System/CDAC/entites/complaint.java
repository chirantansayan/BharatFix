package Compliant_System.CDAC.entites;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import Compliant_System.CDAC.enums.ComplaintStatus;
import Compliant_System.CDAC.enums.DepartmentName;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class complaint {
	@Id
	@GeneratedValue
	private long complaintid;
	
	@ManyToOne
	@JoinColumn(name = "userid")
	private user user;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private DepartmentName departmentName;
	
	@Column(columnDefinition = "TEXT")
	private String description;
	
	@Column
	private String image;
	
	@Column
	private BigDecimal longitude;
	
	@Column
	private BigDecimal latitude;
	
	@Builder.Default
	private ComplaintStatus status = ComplaintStatus.OPEN;
	
	@Builder.Default
	private LocalDateTime createdat = LocalDateTime.now();
}
