IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210916210354_InitialCreate-v1')
BEGIN
    CREATE TABLE [Common_Login] (
        [IdUsuario] int NOT NULL IDENTITY,
        [Usuario] nvarchar(50) NULL,
        [Clave] nvarchar(150) NULL,
        [UltimoLogin] datetime2 NULL,
        [NroIntentos] int NULL,
        [Estado] bit NULL,
        [UsuarioCrea] nvarchar(25) NULL,
        [FechaCrea] datetime2 NULL,
        [UsuarioMod] nvarchar(25) NULL,
        [FechaMod] datetime2 NULL,
        [Accion] nvarchar(25) NULL,
        CONSTRAINT [PK_Common_Login] PRIMARY KEY ([IdUsuario])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210916210354_InitialCreate-v1')
BEGIN
    CREATE TABLE [Erp_Sociedad] (
        [IdSociedad] int NOT NULL IDENTITY,
        [CodigoSociedad] nvarchar(10) NULL,
        [Ruc] nvarchar(15) NULL,
        [RazSoc] nvarchar(150) NULL,
        [NombComercial] nvarchar(150) NULL,
        [TipoEmpresa] nvarchar(15) NULL,
        [Condicion] nvarchar(250) NULL,
        [Direccion] nvarchar(250) NULL,
        [Referencia] nvarchar(500) NULL,
        [NombreServer] nvarchar(50) NULL,
        [NombreDB] nvarchar(50) NULL,
        [TipoAutenticaSql] nvarchar(1) NULL,
        [UsuarioServer] nvarchar(100) NULL,
        [ClaveServer] nvarchar(250) NULL,
        [Estado] bit NULL,
        [UsuarioCrea] nvarchar(25) NULL,
        [FechaCrea] datetime2 NULL,
        [UsuarioMod] nvarchar(25) NULL,
        [FechaMod] datetime2 NULL,
        [Accion] nvarchar(25) NULL,
        [TipoDB] nvarchar(6) NULL,
        [ClientID] nvarchar(50) NULL,
        [ConnectionString] nvarchar(100) NULL,
        [LogoSociedad] nvarchar(900) NULL,
        [TipoEntidad] nvarchar(50) NULL,
        CONSTRAINT [PK_Erp_Sociedad] PRIMARY KEY ([IdSociedad])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210916210354_InitialCreate-v1')
BEGIN
    CREATE TABLE [gsi.gba_TipoOperacion] (
        [IdTipoOperacion] int NOT NULL IDENTITY,
        [NombreTipoOperacion] nvarchar(50) NULL,
        [UsuarioCrea] nvarchar(50) NULL,
        [FechaCrea] datetime2 NULL,
        [UsuarioMod] nvarchar(50) NULL,
        [FechaMod] datetime2 NULL,
        [Accion] nvarchar(25) NULL,
        CONSTRAINT [PK_gsi.gba_TipoOperacion] PRIMARY KEY ([IdTipoOperacion])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210916210354_InitialCreate-v1')
BEGIN
    CREATE TABLE [gsi.gba_TipoOperacionDet] (
        [IdTipoOperacionDet] int NOT NULL IDENTITY,
        [IdTipoOperacion] int NULL,
        [CargoAbono] nvarchar(1) NULL,
        [Estado] bit NOT NULL,
        [UsuarioCrea] nvarchar(50) NULL,
        [FechaCrea] datetime2 NULL,
        [UsuarioMod] nvarchar(50) NULL,
        [FechaMod] datetime2 NULL,
        [Accion] nvarchar(25) NULL,
        [gba_TipoOperacionIdTipoOperacion] int NULL,
        CONSTRAINT [PK_gsi.gba_TipoOperacionDet] PRIMARY KEY ([IdTipoOperacionDet]),
        CONSTRAINT [FK_gsi.gba_TipoOperacionDet_gsi.gba_TipoOperacion_gba_TipoOperacionIdTipoOperacion] FOREIGN KEY ([gba_TipoOperacionIdTipoOperacion]) REFERENCES [gsi.gba_TipoOperacion] ([IdTipoOperacion]) ON DELETE NO ACTION
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210916210354_InitialCreate-v1')
BEGIN
    CREATE INDEX [IX_gsi.gba_TipoOperacionDet_gba_TipoOperacionIdTipoOperacion] ON [gsi.gba_TipoOperacionDet] ([gba_TipoOperacionIdTipoOperacion]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210916210354_InitialCreate-v1')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210916210354_InitialCreate-v1', N'5.0.9');
END;
GO

COMMIT;
GO

