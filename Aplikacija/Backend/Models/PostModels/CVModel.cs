namespace Models
{
    public class AdditionalInfoModel
    {
        public string Title { get; set; } = "";
        public string Type { get; set; } = "";
        public string Description { get; set; } = "";
    }

    public class SkillCategoryModel
    {
        public int Id { get; set; }
        public string Label { get; set; } = "";
    }
    public class ExperienceModel
    {
        public string Title { get; set; } = "";
        public string InstitutionName { get; set; } = "";
        public string Description { get; set; } = "";
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }

    public class CVModel
    {
        public string Phone { get; set; } = "";
        public string Address { get; set; } = "";
        public string City { get; set; } = "";
        public List<ExperienceModel> Education { get; set; } = default!;
        public List<ExperienceModel> Experience { get; set; } = default!;
        public List<SkillCategoryModel> Skills { get; set; } = default!;
        public List<SkillCategoryModel> Categories { get; set; } = default!;
        public List<AdditionalInfoModel> Languages { get; set; } = default!;
        public List<AdditionalInfoModel> AdditionalInfo { get; set; } = default!;
    }
}