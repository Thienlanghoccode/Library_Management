class AuthorModel {
    id?: number;
    name: string;
    dateOfBirth?: string;
    description?: string;
    image?: string;
    created_at?: string;
    updated_at?: string;
    totalBook?: number;

    constructor(
        id: number,
        name: string,
        date_of_birth: string,
        description: string,
        image: string,
        total_book: number,
        created_at?: string,
        updated_at?: string,
    ) {
        this.id = id;
        this.name = name;
        this.dateOfBirth = date_of_birth;
        this.description = description;
        this.image = image;
        this.totalBook = total_book;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

export default AuthorModel;
