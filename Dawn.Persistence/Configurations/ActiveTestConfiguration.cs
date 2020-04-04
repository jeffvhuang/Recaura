﻿using Dawn.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Dawn.Persistence.Configurations
{    
    public class ActiveTestConfiguration : IEntityTypeConfiguration<ActiveTest>
    {
        public void Configure(EntityTypeBuilder<ActiveTest> entity)
        {
            entity.ToTable("ActiveTests");

            entity.Property(e => e.Id).IsRequired();
            entity.Property(e => e.ObjectiveAssessmentId).IsRequired();

            entity.Property(e => e.Name)
                .HasColumnType("nvarchar(100)");

            entity.Property(e => e.Value)
                .HasColumnType("decimal");

            entity.Property(e => e.Comment)
                .HasColumnType("nvarchar(200)");

            entity.HasOne(p => p.ObjectiveAssessment)
                .WithMany(e => e.Active)
                .HasForeignKey(p => p.ObjectiveAssessmentId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}