namespace Models
{
    public class InternshipModel
    {
        public int ID { get; set; }

        public string Title { get; set; } = default!;

        public string Description { get; set; } = default!;

        public int Duration { get; set; }

        public int Compensation { get; set; }

        public List<string> Skills { get; set; } = default!;

        public List<string> Categories { get; set; } = default!;
    }

}